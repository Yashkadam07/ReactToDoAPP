import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Task from './components/Task';
// this is the parent component
export default function App() {
  const [task, setTask] = useState();
  const [taskItem, setTaskItem] = useState([]);

  {/* to display the task on the screen */ }
  const handleAddTask = () => {
    setTaskItem([...taskItem, task])
    setTask(null);
  }

  {/** to delete the item */ }
  const completeTask = (index) => {
    let itemCopy = [...taskItem];
    itemCopy.splice(index, 1);
    setTaskItem(itemCopy);
  }


  return (
    
    <View style={styles.container}>
    

      {/** adding scrollview only when the items are more than the screen */}
      <ScrollView
        contentContainerStyle={
          {
            flexGrow: 1
          }
        }
        keyboardShouldPersistTaps='handled'
      >
        {/**Today's Task  */}

        <View style={styles.taskWrapper}>
          <Text style={styles.sectionTitle} > Today's tasks </Text>

          <View style={styles.items}>
            {/** this is for the tasks of the days which user will create  */}

            {
              taskItem.map((item, index) => {
                return (
                  <TouchableOpacity key={index} onPress={() => completeTask(index)}>
                    <Task text={item} />

                  </TouchableOpacity>
                )

              })

            }


            {/* {<Task text={'Task 1'}/>
            <Task text={'Task 2'}/>} */}

          </View>
        </View>


      </ScrollView>
      {/* Section to write the task  */}
      <KeyboardAvoidingView
        behaviour={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.writeTaskWrapper}
      >

        <TextInput style={styles.input} placeholder="write a task" value={task} onChangeText={text => setTask(text)} />

        <TouchableOpacity onPress={() => handleAddTask()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>
              +
            </Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgrey',

  },
  taskWrapper: {


    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 700


  },
  items: {

    marginTop: 30
  }
  ,
  writeTaskWrapper: {

    position: 'absolute',
    bottom: 60,
    width: '100%',
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'


  },
  input: {
    backgroundColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 60,
    width: 250,
    borderWidth: 1,
    borderColor: '#C0C0C0'

  },
  addWrapper: {
    height: 60,
    width: 60,
    backgroundColor: 'white',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#C0C0C0'


  },
  addText: {


  },


});

