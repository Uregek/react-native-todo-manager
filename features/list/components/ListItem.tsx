import { memo, useState, FC } from "react";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Adapt, Input, ListItem as ListItemTamagui, Popover, XStack, YGroup, YStack, Button } from "tamagui";
import { ChevronRight, Edit2, Trash } from "@tamagui/lucide-icons";
import { SwipeRow } from "react-native-swipe-list-view";

import { ListType } from "../model";
import { useListContext } from "../providers";

export const ListItem: FC<ListType> = memo(({ text, id }) => {
  const { navigate } = useNavigation<NavigationProp<StackParamList>>();

  const [editedText, setEditedText] = useState(text);

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const [, { removeList, renameList }] = useListContext();

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
        onRightAction={() => removeList(id)}
      >
        <XStack justifyContent="space-between">
          <Popover.Trigger asChild>
            <Button icon={Edit2} theme="yellow_active" width={125} borderBottomRightRadius={0} borderTopRightRadius={0} />
          </Popover.Trigger>
          <Button icon={Trash} theme="red_active" width={125} borderBottomLeftRadius={0} borderTopLeftRadius={0} onPress={() => removeList(id)} />
        </XStack>
        <YGroup.Item>
          <ListItemTamagui marginBottom={2} iconAfter={ChevronRight} hoverTheme pressTheme bordered title={text} onPress={() => navigate("TodoList", { todoListId: id })} />
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
          <Input autoFocus size="$3" placeholder="Rename todo list..." value={editedText} onChangeText={(text) => setEditedText(text)} />

          <Popover.Close asChild>
            <Button
              size="$3"
              theme="active"
              disabled={!editedText.length}
              onPress={() => {
                renameList(id, editedText);
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
