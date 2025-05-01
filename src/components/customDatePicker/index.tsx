import React, { useEffect, useState } from "react";
import { Modal, Platform, View } from 'react-native';
import {styles} from './styles'
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";

interface CustomDateTimePickerProps {
    type: 'date' | 'time';
    onDateChange: (date: Date) => void;
    show: boolean;
    setShow: (show: boolean) => void;
}

export default function CustomDateTimePicker({type, onDateChange, show, setShow}: CustomDateTimePickerProps) {

    const [date, setDate] = useState(new Date())

    useEffect(()=> {
        if (onDateChange){
            onDateChange(date)
        }
    },[date, onDateChange])

    const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
        const currentDate = selectedDate || date;

        setDate(currentDate);
        setShow(false); //oculta o picker apos a seleção
    };

    return (
        <Modal
            transparent={true}
            visible={show}
            onRequestClose={()=>setShow(false)}
        >
            <View style={styles.modalOverlay}>
                <View style={[
                    styles.container,
                    Platform.OS == 'android'&&{backgroundColor:'transparent'}
                ]}>
                    <DateTimePicker 
                        value={date}
                        mode={type}
                        display={Platform.OS === 'ios'?'inline':'default'}
                        onChange={onChange}
                    />
                </View>
            </View>
        </Modal>
    )
}

