import { memo, useState, FC } from "react";
import { Adapt, Input, ListItem, Popover, XStack, YGroup, YStack, Button } from "tamagui";
import { Check, Dot, Edit2, Trash } from "@tamagui/lucide-icons";
import { SwipeRow } from "react-native-swipe-list-view";

import { useTodoContext } from "../providers";
import { TodoType } from "../model";

export const Todo: FC<TodoType> = memo(({ text, id, solved }) => {
  const [editedText, setEditedText] = useState(text);

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const [, { removeTodo, renameTodo, toggleSolved }] = useTodoContext();

  return (
    <Popover size="$5" allowFlip placement="bottom" open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
      <SwipeRow
        leftOpenValue={120}
        stopLeftSwipe={120}
        leftActivationValue={110}
        onLeftAction={() => setIsPopoverOpen(true)}
        rightOpenValue={-120}
        stopRightSwipe={-120}
        rightActivationValue={-110}
        onRightAction={() => removeTodo(id)}
        disableLeftSwipe={!solved}
      >
        <XStack justifyContent="space-between">
          <Popover.Trigger asChild>
            <Button icon={Edit2} theme="yellow_active" width={125} borderBottomRightRadius={0} borderTopRightRadius={0} />
          </Popover.Trigger>
          <Button icon={Trash} theme="red_active" width={125} borderBottomLeftRadius={0} borderTopLeftRadius={0} onPress={() => removeTodo(id)} />
        </XStack>
        <YGroup.Item>
          <ListItem marginBottom={2} icon={solved ? Check : Dot} hoverTheme pressTheme bordered title={text} onPress={() => toggleSolved(id)} />
        </YGroup.Item>
      </SwipeRow>

      <Adapt when="sm" platform="touch">
        <Popover.Sheet modal dismissOnSnapToBottom>
          <Popover.Sheet.Frame padding="$4">
            <Adapt.Contents />
          </Popover.Sheet.Frame>
          <Popover.Sheet.Overlay animation="lazy" enterStyle={{ opacity: 0 }} exitStyle={{ opacity: 0 }} />
        </Popover.Sheet>
      </Adapt>

      <Popover.Content
        borderWidth={1}
        borderColor="$borderColor"
        enterStyle={{ y: -10, opacity: 0 }}
        exitStyle={{ y: -10, opacity: 0 }}
        elevate
        animation={[
          "quick",
          {
            opacity: {
              overshootClamping: true,
            },
          },
        ]}
      >
        <Popover.Arrow borderWidth={1} borderColor="$borderColor" />

        <YStack space="$3">
          <Input autoFocus size="$3" placeholder="Rename todo..." value={editedText} onChangeText={(text) => setEditedText(text)} />

          <Popover.Close asChild>
            <Button
              size="$3"
              theme="active"
              disabled={!editedText.length}
              onPress={() => {
                renameTodo(id, editedText);
              }}
            >
              Rename
            </Button>
          </Popover.Close>
        </YStack>
      </Popover.Content>
    </Popover>
  );
});
