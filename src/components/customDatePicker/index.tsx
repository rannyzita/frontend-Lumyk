import DateTimePicker from '@react-native-community/datetimepicker';
import React from 'react';
import { Platform, View } from 'react-native';

interface Props {
    show: boolean;
    setShow: (show: boolean) => void;
    onDateChange: (date: Date) => void;
    type: 'date' | 'time';
    date?: Date | null;
}

export default function CustomDateTimePicker({ show, setShow, onDateChange, type, date }: Props) {
    const today = new Date();
    const defaultDate = date || today;

    return (
        <>
        {show && (
            <DateTimePicker
                value={defaultDate}
                mode={type}
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={(event, selectedDate) => {
                    setShow(false);
                    if (selectedDate) {
                        onDateChange(selectedDate);
                    }
                }}
            />
        )}
        </>
    );
}
