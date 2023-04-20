package main

import (
	"encoding/json"
	"io/ioutil"
	"os"
	"path/filepath"
	"sync"
	"testing"

	"github.com/stretchr/testify/assert"
)

type mockLogger struct{}

func (l *mockLogger) Fatal(string, ...interface{}) {}
func (l *mockLogger) Error(string, ...interface{}) {}
func (l *mockLogger) Warn(string, ...interface{})  {}
func (l *mockLogger) Info(string, ...interface{})  {}
func (l *mockLogger) Debug(string, ...interface{}) {}
func (l *mockLogger) Trace(string, ...interface{}) {}

func TestDriver_Write(t *testing.T) {
	// Create a temporary directory for testing.
	tmpDir, err := ioutil.TempDir("", "driver-test")
	assert.NoError(t, err)
	defer os.RemoveAll(tmpDir)

	// Create a new driver with a mock logger.
	driver := &Driver{
		mutexes: make(map[string]*sync.Mutex),
		dir:     tmpDir,
		log:     &mockLogger{},
	}

	// Write a record to a new collection.
	collection := "test-collection"
	resource := "test-resource"
	data := map[string]string{
		"foo": "bar",
	}
	err = driver.Write(collection, resource, data)
	assert.NoError(t, err)

	// Check that the record was saved to disk.
	fileContents, err := ioutil.ReadFile(filepath.Join(driver.dir, collection, resource+".json"))
	assert.NoError(t, err)
	var savedData map[string]string
	err = json.Unmarshal(fileContents, &savedData)
	assert.NoError(t, err)
	assert.Equal(t, data, savedData)

	// Write another record to the same collection.
	resource2 := "test-resource2"
	data2 := map[string]string{
		"baz": "qux",
	}
	err = driver.Write(collection, resource2, data2)
	assert.NoError(t, err)

	// Check that the second record was saved to disk.
	fileContents, err = ioutil.ReadFile(filepath.Join(driver.dir, collection, resource2+".json"))
	assert.NoError(t, err)
	var savedData2 map[string]string
	err = json.Unmarshal(fileContents, &savedData2)
	assert.NoError(t, err)
	assert.Equal(t, data2, savedData2)

	// Write a record with an empty collection.
	err = driver.Write("", "test-resource3", data)
	assert.Error(t, err)

	// Write a record with an empty resource.
	err = driver.Write(collection, "", data)
	assert.Error(t, err)
}

func  TestDelete{
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

	assert.NoError(t, err)
	case fi.Mode().IsRegular():
		return os.RemoveAll(dir + ".json")
	}
	assert.Error(t, err)
}

func TestGetOrCreateMutex{

	d.mutex.Lock()
	defer d.mutex.Unlock()
	m, ok := d.mutexes[collection]

	if !ok {
		m = &sync.Mutex{}
		d.mutexes[collection] = m
	}

	return m
}

func TestWrite {
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

func TestRead {

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

func (d *Driver) Read(collection, resource string, v interface{}) error {
	if collection == "" {
		return fmt.Errorf("Missing collection  - no place to save record!")
	}


	if resource == "" {
		return fmt.Errorf("Missing resource - unable to save record (no name)!")
	}

	record := filepath.Join(d.dir, collection, resource)



	if _, err := os.Stat(record); err != nil {
		return err
	}

	b, err := ioutil.ReadFile(record + ".json")
	if err != nil {
		return err
	}


	return json.Unmarshal(b, &v)
}

func (d *Driver) Delete(collection, resource string) error {
	path := filepath.Join(collection, resource)

	
	mutex := d.getOrCreateMutex(collection)
	
	mutex.Lock()
	
	defer mutex.Unlock()


	
	dir := filepath.Join(d.dir, path)


	
	switch fi, err := os.Stat(dir); {
	case fi == nil, err != nil:
		return fmt.Errorf("unable to find file or directory named %v\n", path)

	case fi.Mode().IsDir():
		return os.RemoveAll(dir)

		assert.NoError(t, err)
	case fi.Mode().IsRegular():
		return os.RemoveAll(dir + ".json")
	}


	return fmt.Errorf("unexpected error")
}

func (d *Driver) getOrCreateMutex(collection string) *sync.Mutex {
	
	d.mutexesLock.Lock()
	
	defer d.mutexesLock.Unlock()
	
	m, ok := d.mutexes[collection]

	if !ok {
		m = &sync.Mutex{}
		d.mutexes[collection] = m
	}

	return m
}