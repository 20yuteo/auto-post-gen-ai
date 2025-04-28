"use client";

import { Portal, Select, createListCollection } from "@chakra-ui/react";

const times = createListCollection({
  items: [
    { value: "0:00", label: "0:00" },
    { value: "1:00", label: "1:00" },
    { value: "2:00", label: "2:00" },
    { value: "3:00", label: "3:00" },
    { value: "4:00", label: "4:00" },
    { value: "5:00", label: "5:00" },
    { value: "6:00", label: "6:00" },
    { value: "7:00", label: "7:00" },
    { value: "8:00", label: "8:00" },
    { value: "9:00", label: "9:00" },
    { value: "10:00", label: "10:00" },
    { value: "11:00", label: "11:00" },
    { value: "12:00", label: "12:00" },
    { value: "13:00", label: "13:00" },
    { value: "14:00", label: "14:00" },
    { value: "15:00", label: "15:00" },
    { value: "16:00", label: "16:00" },
    { value: "17:00", label: "17:00" },
    { value: "18:00", label: "18:00" },
    { value: "19:00", label: "19:00" },
    { value: "20:00", label: "20:00" },
    { value: "21:00", label: "21:00" },
    { value: "22:00", label: "22:00" },
    { value: "23:00", label: "23:00" },
  ],
});

type TimeSelectorProps = {
  schedules: {
    label: string;
    value: string;
  }[];
  onChange: (schedules: { label: string; value: string }[]) => void;
};

export const TimeSelector = ({ schedules, onChange }: TimeSelectorProps) => {
  return (
    <>
      <Select.Root
        collection={times}
        size="sm"
        width="320px"
        multiple
        required
        value={schedules.map((s) => s.value)}
        onValueChange={(value) => {
          const selectedItems = value.items;

          if (selectedItems.length > 3) {
            return;
          }

          onChange(selectedItems);
          return;
        }}
      >
        <Select.HiddenSelect />
        <Select.Label>＊You can select up to 3 schedules</Select.Label>
        <Select.Control>
          <Select.Trigger>
            <Select.ValueText placeholder="Please select schedules" />
          </Select.Trigger>
          <Select.IndicatorGroup>
            <Select.Indicator />
          </Select.IndicatorGroup>
        </Select.Control>
        <Portal>
          <Select.Positioner>
            <Select.Content>
              {times.items.map((time) => (
                <Select.Item item={time} key={time.value}>
                  {time.label}
                  <Select.ItemIndicator />
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Positioner>
        </Portal>
      </Select.Root>
    </>
  );
};
