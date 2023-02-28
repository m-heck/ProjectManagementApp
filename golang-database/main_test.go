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
