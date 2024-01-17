import { useState } from "react";
import { StyleSheet, SafeAreaView, FlatList } from "react-native";
import { Button, Input, Separator, Text, XStack, YGroup, YStack } from "tamagui";
import { ListMinus, Plus } from "@tamagui/lucide-icons";

import { ListItem } from "../components";
import { useListContext } from "../providers";

export const Lists = () => {
  const [newListText, setNewListText] = useState("");

  const [{ lists }, { createList }] = useListContext();

  return (
    <SafeAreaView style={styles.container}>
      <YStack space="$2" flex={1}>
        <XStack alignItems="center" space="$2">
          <ListMinus />
          <Text fontSize="$7">Manage Lists</Text>
        </XStack>
        <YStack space="$2" flex={1}>
          <XStack alignItems="center" space="$2">
            <Input flex={1} placeholder="Enter list..." value={newListText} onChangeText={(text) => setNewListText(text)} />

            {Boolean(newListText.length) && (
              <Button
                size="$3"
                theme="active"
                icon={Plus}
                disabled={!newListText.length}
                onPress={() => {
                  createList(newListText);
                  setNewListText("");
                }}
              />
            )}
          </XStack>

          {Boolean(lists.length) ? (
            <YStack space="$2" flex={1}>
              <Separator />
              <YGroup alignSelf="center" flex={1} width="100%" size="$4" separator={<Separator />}>
                <FlatList data={lists} renderItem={({ item }) => <ListItem id={item.id} text={item.text} todos={item.todos} />} />
              </YGroup>
            </YStack>
          ) : (
            <Text textAlign="center">Create some list 🐙</Text>
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
});
