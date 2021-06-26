/* eslint-disable no-shadow */
import React, {useState} from 'react';
import {format, getDay} from 'date-fns';
import {es} from 'date-fns/locale';
import {DatePickerCalendar} from 'react-nice-dates';
import {includes, map, get} from 'lodash';

const DatePickerCalendarExample = ({
    date,
    setDate,
    agenda,
    ...props
}) => {
    const disabledDays = map(agenda, a => {
        if (!get(a, 'agenda_open')) {
            return get(a, 'agenda_week_day');
        }
        return null;
    });
    const modifiers = {
        disabled: date => includes(disabledDays, getDay(date)),
        highlight: date => includes(disabledDays, getDay(date))
    };
    return (
        <div>
            <p>
                Fecha seleccionada:
                {' '}
                {date ? format(date, 'dd MMM yyyy', {locale: es}) : 'none'}
                .
            </p>
            <DatePickerCalendar
                date={date}
                onDateChange={setDate}
                locale={es}
                modifiers={modifiers}
            />
        </div>
    );
};

export default DatePickerCalendarExample;
