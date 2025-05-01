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
    const fourteenYearsAgo = new Date(today.getFullYear() - 14, today.getMonth(), today.getDate());

    return (
        <>
        {show && (
            <DateTimePicker
                value={date || fourteenYearsAgo}
                mode={type}
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={(event, selectedDate) => {
                    setShow(false);
                    if (selectedDate) {
                    onDateChange(selectedDate);
                    }
                }}
                maximumDate={fourteenYearsAgo} // impede selecionar < 14 anos; oq tava la na regra de negocio
            />
        )}
        </>
    );
}
