import React, {Component} from 'react';
import {
  Text,
  View,
  Button,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import WorkItem from './WorkItem';
import AddWorkItem from './AddWorkItem';

console.disableYellowBox = true;
export default class Work extends Component {
  state = {
    toDoList: [
      {
        workItem: 'Write some Code!',
        id: 'uuid1',
      },
      {
        workItem: 'Debug the Code!',
        id: 'uuid12',
      },
      {
        workItem: 'Test the final Output!',
        id: 'uuid123',
      },
    ],
    showWorkItems: false,
    addWorkItem: false,
    itemToBeInsert: '',
  };

  toggleWorkItems = () => {
    this.setState({
      showWorkItems: !this.state.showWorkItems,
    });
  };
  toggleAddWorkItems = () => {
    this.setState({
      addWorkItem: !this.state.addWorkItem,
    });
  };
  canceled = () => {
    this.setState({
      addWorkItem: !this.state.addWorkItem,
    });
  };

  addNewItem = event => {
    this.setState({
      itemToBeInsert: event.nativeEvent.text,
    });
  };
  addItem = () => {
    newItem = [
      {
        workItem: this.state.itemToBeInsert,
        id: 'uuid321',
      },
    ];
    this.setState({
      toDoList: [...this.state.toDoList, ...newItem],
      addWorkItem: !this.state.addWorkItem,
    });
  };

  removeItem = workItemIndex => {
    const toDoList = this.state.toDoList.slice();
    toDoList.splice(workItemIndex, 1);
    this.setState({
      toDoList: toDoList,
    });
  };
  render() {
    let workItems = null;
    if (this.state.showWorkItems) {
      workItems = (
        <>
          {this.state.toDoList.map((toDoList, index) => {
            return (
              <WorkItem
                key={toDoList.id}
                workItem={toDoList.workItem}
                removeItem={() => this.removeItem(index)}
              />
            );
          })}
        </>
      );
    }

    let addWorkItem = null;
    if (this.state.addWorkItem) {
      addWorkItem = (
        <AddWorkItem
          cancel={this.canceled}
          save={this.addItem}
          insertWorkItem={this.addNewItem}
        />
      );
    }
    return (
      <View style={{backgroundColor: '#000', flex: 1}}>
        <Button title="Check Work Items" onPress={this.toggleWorkItems} />
        <ScrollView>
          {workItems}
          {addWorkItem}
        </ScrollView>
        <TouchableOpacity
          style={styles.bottomView}
          onPress={this.toggleAddWorkItems}>
          <Text style={styles.textStyle}>Add Item</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bottomView: {
    width: '30%',
    height: 40,
    backgroundColor: '#FF9800',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    borderRadius: 30,
  },

  textStyle: {
    color: '#fff',
  },
});
