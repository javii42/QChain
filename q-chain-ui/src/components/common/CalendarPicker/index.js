import React, {useState} from 'react';
import {format} from 'date-fns';
import {es} from 'date-fns/locale';
import {DatePickerCalendar} from 'react-nice-dates';

export default function DatePickerCalendarExample({
    date,
    setDate
}) {
    return (
        <div>
            <p>
                Fecha seleccionada:
                {' '}
                {date ? format(date, 'dd MMM yyyy', {locale: es}) : 'none'}
                .
            </p>
            <DatePickerCalendar date={date} onDateChange={setDate} locale={es}/>
        </div>
    );
}
