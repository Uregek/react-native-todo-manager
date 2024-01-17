import { StyleSheet, SafeAreaView, FlatList } from "react-native";
import { useState } from "react";
import { Button, Input, Separator, Text, XStack, YGroup, YStack } from "tamagui";
import { ListTodo, Plus } from "@tamagui/lucide-icons";

import { Todo } from "../components";
import { useTodoContext } from "../providers";

export const TodoList = () => {
  const [newTodoText, setNewTodoText] = useState("");

  const [{ todos, title, totalCount, solvedCount }, { addTodo }] = useTodoContext();

  return (
    <SafeAreaView style={styles.container}>
      <YStack space="$2" flex={1}>
        <XStack alignItems="center" space="$2">
          <ListTodo />
          <Text fontSize="$7">{title}</Text>
        </XStack>
        <Text style={styles.summary}>{`${solvedCount}/${totalCount}`}</Text>
        <YStack space="$2" flex={1}>
          <XStack alignItems="center" space="$2">
            <Input flex={1} placeholder="Enter todo..." value={newTodoText} onChangeText={(text) => setNewTodoText(text)} />

            {Boolean(newTodoText.length) && (
              <Button
                size="$3"
                theme="active"
                icon={Plus}
                disabled={!newTodoText.length}
                onPress={() => {
                  addTodo(newTodoText);
                  setNewTodoText("");
                }}
              />
            )}
          </XStack>

          {Boolean(todos.length) ? (
            <YStack space="$2" flex={1}>
              <Separator />
              <YGroup alignSelf="center" flex={1} width="100%" size="$4" separator={<Separator />}>
                <FlatList data={todos} renderItem={({ item }) => <Todo id={item.id} text={item.text} solved={item.solved} />} />
              </YGroup>
            </YStack>
          ) : (
            <Text textAlign="center">Create some todo 🐙</Text>
          )}
        </YStack>
      </YStack>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
  summary: {
    textAlign: "right",
  },
});
