package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"os"
	"path/filepath"
	"sync"

	"github.com/jcelliott/lumber"
)

const Version = "1.16.7"

type (
	Logger interface {
		Fatal(string, ...interface{})
		Error(string, ...interface{})
		Warn(string, ...interface{})
		Info(string, ...interface{})
		Debug(string, ...interface{})
		Trace(string, ...interface{})
	}

	//between code and data
	Driver struct {
		mutex   sync.Mutex
		mutexes map[string]*sync.Mutex
		dir     string
		log     Logger
	}
)

//creating online database

type Options struct {
	Logger
}

func New(dir string, options *Options) (*Driver, error) {
	dir = filepath.Clean(dir)
	opts := Options{}

	if options != nil {
		opts = *options
	}

	if opts.Logger == nil {
		opts.Logger = lumber.NewConsoleLogger((lumber.INFO))
	}

	driver := Driver{
		dir:     dir,
		mutexes: make(map[string]*sync.Mutex),
		log:     opts.Logger,
	}

	if _, err := os.Stat(dir); err == nil {
		opts.Logger.Debug("Using '%s' (database already exists)\n", dir)
		return &driver, nil
	}

	opts.Logger.Debug("Creating the database at '%s' ... \n", dir)
	return &driver, os.MkdirAll(dir, 0755)
}

func (d *Driver) Write(collection, resource string, v interface{}) error {
	if collection == "" {
		return fmt.Errorf("Missing Collection - no place to save record!")
	}

	if resource == "" {
		return fmt.Errorf("Missing resource - unable to save record (no name)!")
	}

	mutex := d.getOrCreateMutex(collection)
	mutex.Lock()
	defer mutex.Unlock()

	dir := filepath.Join(d.dir, collection)
	fnlPath := filepath.Join(dir, resource+".json")
	tmpPath := fnlPath + ".tmp"

	if err := os.MkdirAll(dir, 0755); err != nil {
		return err
	}

	b, err := json.MarshalIndent(v, "", "\t")
	if err != nil {
		return err
	}
	b = append(b, byte('\n'))

	if err := ioutil.WriteFile(tmpPath, b, 0644); err != nil {
		return err
	}

	return os.Rename(tmpPath, fnlPath)

}

func (d *Driver) Upload(collection, resource string, v interface{}) error {
	if collection == "" {
		return fmt.Errorf("Missing Collection - no place to save record!")
	}

	if resource == "" {
		return fmt.Errorf("Missing resource - unable to save record (no name)!")
	}

	mutex := d.getOrCreateMutex(collection)
	mutex.Lock()
	defer mutex.Unlock()

	dir := filepath.Join(d.dir, collection)
	fnlPath := filepath.Join(dir, resource+".json")
	tmpPath := fnlPath + ".tmp"

	if err := os.MkdirAll(dir, 0755); err != nil {
		return err
	}

	b, err := json.MarshalIndent(v, "", "\t")
	if err != nil {
		return err
	}
	b = append(b, byte('\n'))

	if err := ioutil.WriteFile(tmpPath, b, 0644); err != nil {
		return err
	}

	return os.Rename(tmpPath, fnlPath)

}

func (d *Driver) Scanner(collection, resource string, v interface{}) error {

	if collection == "" {
		return fmt.Errorf("Missing collection  - no place to save record!")
	}

	if resource == "" {
		return fmt.Errorf("Missing resource - unable to save record (no name)!")
	}

	record := filepath.Join(d.dir, collection, resource)

	if _, err := stat(record); err != nil {
		return err
	}

	b, err := ioutil.ReadFile(record + ".json")
	if err != nil {
		return err
	}
	return json.Unmarshal(b, &v)
}

func (d *Driver) Read(collection, resource string, v interface{}) error {

	if collection == "" {
		return fmt.Errorf("Missing collection  - no place to save record!")
	}

	if resource == "" {
		return fmt.Errorf("Missing resource - unable to save record (no name)!")
	}

	record := filepath.Join(d.dir, collection, resource)

	if _, err := stat(record); err != nil {
		return err
	}

	b, err := ioutil.ReadFile(record + ".json")
	if err != nil {
		return err
	}
	return json.Unmarshal(b, &v)
}

func (d *Driver) ReadAll(collection string) ([]string, error) {
	if collection == "" {
		return nil, fmt.Errorf("Missing collection - unable to read")
	}
	dir := filepath.Join(d.dir, collection)

	if _, err := stat(dir); err != nil { //stat checks if it exists
		return nil, err
	}

	files, _ := ioutil.ReadDir(dir)

	var records []string

	for _, file := range files {
		b, err := ioutil.ReadFile(filepath.Join(dir, file.Name())) //creates the names
		if err != nil {
			return nil, err
		}

		records = append(records, string(b))
	}
	return records, nil
}

func (d *Driver) Mutate(collection, resource string, v interface{}) error {
	if collection == "" {

		return fmt.Errorf("Missing Collection - no place to save record!")

	}

	if resource == "" {

		return fmt.Errorf("Missing resource - unable to save record (no name)!")

	}

	mutex := d.getOrCreateMutex(collection)
	mutex.Lock()

	defer mutex.Unlock()

	dir := filepath.Join(d.dir, collection)

	fnlPath := filepath.Join(dir, resource+".json")

	tmpPath := fnlPath + ".tmp"

	if err := os.MkdirAll(dir, 0755); err != nil {
		return err
	}

	b, err := json.MarshalIndent(v, "", "\t")

	if err != nil {

		return err
	}
	b = append(b, byte('\n'))

	if err := ioutil.WriteFile(tmpPath, b, 0644); err != nil {

		return err

	}
	//mutex := d.getOrCreateMutex(collection)

	mutex.Lock()

	defer mutex.Unlock()

	//dir := filepath.Join(d.dir, collection)

	//fnlPath := filepath.Join(dir, resource+".json")

	//tmpPath := fnlPath + ".tmp"

	if err := os.MkdirAll(dir, 0755); err != nil {
		return err
	}

	//b, err := json.MarshalIndent(v, "", "\t")

	if err != nil {
		return err
	}

	return os.Rename(tmpPath, fnlPath)

}

func (d *Driver) Discard(collection, resource string, v interface{}) error {
	if collection == "" {
		return fmt.Errorf("Missing Collection - no place to save record!")
	}

	if resource == "" {
		return fmt.Errorf("Missing resource - unable to save record (no name)!")
	}

	mutex := d.getOrCreateMutex(collection)
	mutex.Lock()
	defer mutex.Unlock()

	dir := filepath.Join(d.dir, collection)
	fnlPath := filepath.Join(dir, resource+".json")
	tmpPath := fnlPath + ".tmp"

	if err := os.MkdirAll(dir, 0755); err != nil {
		return err
	}

	b, err := json.MarshalIndent(v, "", "\t")
	if err != nil {
		return err
	}

	b = append(b, byte('\n'))

	if err := ioutil.WriteFile(tmpPath, b, 0644); err != nil {
		return err
	}

	return os.Rename(tmpPath, fnlPath)
}

func (d *Driver) Delete(collection, resource string) error {
	path := filepath.Join(collection, resource)
	mutex := d.getOrCreateMutex(collection)
	mutex.Lock()
	defer mutex.Unlock()

	dir := filepath.Join(d.dir, path)

	switch fi, err := stat(dir); {
	case fi == nil, err != nil:
		return fmt.Errorf("unable to find file or directory named %v\n", path)

	case fi.Mode().IsDir():
		return os.RemoveAll(dir)

	case fi.Mode().IsRegular():
		return os.RemoveAll(dir + ".json")
	}
	return nil
}

/*
	func (d *Driver) Renew(collection, resource string, v interface{}) error {
		if collection == "" {

			return fmt.Errorf("Missing Collection - no place to save record!")

		}


		dir := filepath.Join(d.dir, path)

		switch fi, err := stat(dir); {
		case fi == nil, err != nil:
			return fmt.Errorf("unable to find file or directory named %v\n", path)

		case fi.Mode().IsDir():
			return os.RemoveAll(dir)

		case fi.Mode().IsRegular():
			return os.RemoveAll(dir + ".jso
		dir := filepath.Join(d.dir, collection)


		fnlPath := filepath.Join(dir, resource+".json")

		tmpPath := fnlPath + ".tmp"


		if err := os.MkdirAll(dir, 0755); err != nil {

			return err

		}

		ir := filepath.Join(d.dir, collection)

		fnlPath := filepath.Join(dir, resource+".json
		")

		tmpPath := fnlPath + ".tmp"

		if err := os.MkdirAll(dir, 0755); err != nil {
			return err
		}

		b, err := json.MarshalIndent(v, "", "\t")
		if err != nil {
			return err
		}

		b = append(b, byte('\n'))
		return os.Rename(tmpPath, fnlPath)
	}
*/
func (d *Driver) Revise(collection, resource string, v interface{}) error {
	if collection == "" {

		return fmt.Errorf("Missing Collection - no place to save record!")

	}

	if resource == "" {

		return fmt.Errorf("Missing resource - unable to save record (no name)!")

	}

	mutex := d.getOrCreateMutex(collection)

	mutex.Lock()

	defer mutex.Unlock()

	dir := filepath.Join(d.dir, collection)

	fnlPath := filepath.Join(dir, resource+".json")

	tmpPath := fnlPath + ".tmp"

	if err := os.MkdirAll(dir, 0755); err != nil {

		return err

	}

	b, err := json.MarshalIndent(v, "", "\t")

	if err != nil {

		return err

	}

	b = append(b, byte('\n'))

	if err := ioutil.WriteFile(tmpPath, b, 0644); err != nil {

		return err

	}

	return os.Rename(tmpPath, fnlPath)
}

func (d *Driver) getOrCreateMutex(collection string) *sync.Mutex {

	d.mutex.Lock()
	defer d.mutex.Unlock()
	m, ok := d.mutexes[collection]

	if !ok {
		m = &sync.Mutex{}
		d.mutexes[collection] = m
	}

	return m
}

func stat(path string) (fi os.FileInfo, err error) {
	if fi, err = os.Stat(path); os.IsNotExist(err) {
		fi, err = os.Stat(path + ".json")
	}
	return
}

// what the username stores
type User struct {
	Name     string
	Email    string
	Contact  json.Number
	Password string
}

// main function
func main() {
	var name, email, password string
	var number json.Number

	fmt.Scan(name, email, number, password)
	fmt.Print(name)

	//access directory
	dir := "./"
	db, err := New(dir, nil)
	if err != nil {
		fmt.Println("Error", err)
	}

	//database
	employees := []User{
		//{"Alan", "a.wang@ufl.edu", "3525141846", "IcantactaullyShowmyPasswordLOL"},
		{name, email, number, password},
	}

	for _, value := range employees {
		//adding one user at a time
		db.Write("users", value.Name, User{
			Name:     value.Name,
			Email:    value.Email,
			Contact:  value.Contact,
			Password: value.Password,
		})
	}

	records, err := db.ReadAll("users")
	if err != nil {
		fmt.Println("Error", err)
	}
	fmt.Println(records)

	allusers := []User{}

	for _, f := range records {
		employeeFound := User{}
		if err := json.Unmarshal([]byte(f), &employeeFound); err != nil {
			fmt.Println("Error", err)
		}
		allusers = append(allusers, employeeFound)
	}
	fmt.Println(allusers)

	/*
		if err := db.Delete("users", "Alan"); err != nil{
			fmt.Println("Error", err)
		}
		if err := db.Delete("users","newUsers"); err != nil{
			fmt.Println("Error",err)
		}*/

}
