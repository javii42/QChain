import React, {
    useEffect,
    useState
} from 'react';
import PropTypes from 'prop-types';
import {
    Alert,
    FormGroup
} from 'reactstrap';
import {
    Link
} from 'react-router-dom';
import ModalWithDynamicButtons from '@components/common/ModalWithDynamicButtons';
import {
    KeyboardDatePicker,
    KeyboardTimePicker,
    MuiPickersUtilsProvider
} from '@material-ui/pickers';
import {makeStyles} from '@material-ui/core';
import MomentUtils from '@date-io/moment';
import Moment from 'moment';
import 'moment/locale/es';
import 'moment/locale/pt';
import 'moment/locale/es-us';

import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';

const useStyles = makeStyles({
    datePicker: {
        '& .MuiInputBase-root.Mui-disabled': {
            backgroundColor: 'rgba(26, 25, 25, 0.7)'
        }
    }
});

class LocalizedUtils extends MomentUtils {
    /* getYearRange(start, end) {
        const startDate = this.moment(end).startOf('year');
        const endDate = this.moment(start).endOf('year');
        const years = [];

        let current = startDate;
        while (current.isAfter(endDate)) {
            years.push(current);
            current = current.clone().subtract(1, 'year');
        }

        return years;
    } */
}

function disableWeekends(e) {
    // console.log('e',Moment(e._d))
    // return date.getDay() === 0 || date.getDay() === 6;
}

const miuProps = {
    variant: 'inline',
    views: ['year', 'month', 'date'],
    format: 'DD/MM/YYYY',
    autoOk: true,
    orientation: 'vertical',
    animateYearScrolling: true,
    InputAdornmentProps: {position: 'start'},
    minDate: Moment(),
    maxDate: Moment().add(3, 'M')
};

const DateInput = ({
    i18n,
    formValues,
    members,
    modeling,
    setDate,
    ...props
}) => {
    const [pickerStatus, setPickerStatus] = useState(false);
    const [selectedDate, setSelectedDate] = useState(Moment());

    const classes = useStyles();
    const handleChange = e => {
        setSelectedDate(e);
        setDate(e._d);
    };
    const value = get(props, 'date');

    miuProps.minDate = get(props, 'minDate', miuProps.minDate);
    miuProps.maxDate = get(props, 'maxDate', miuProps.maxDate);

    const handlePickerStatus = status => {
        setPickerStatus(status);
    };

    const handleDateChange = date => {
        setSelectedHour(date);
        setHour(date._d);
    };

    return (
        <FormGroup className="form--input-date mt-1 datepicker-input">
            <MuiPickersUtilsProvider
                utils={LocalizedUtils}
            >
                <KeyboardDatePicker
                    {...miuProps}
                    className={classes.datePicker}
                    disabled={get(props, 'disabled')}
                    id={get(props, 'control')}
                    value={selectedDate}
                    placeHolder="aa"
                    helperText=""
                    openTo="year"
                    onChange={e => handleChange(e)}
                    onClick={() => handlePickerStatus(true)}
                    onClose={() => handlePickerStatus(false)}
                    open={pickerStatus}
                    shouldDisableDate={e => disableWeekends(e)}
                />
            </MuiPickersUtilsProvider>
        </FormGroup>
    );
};

DateInput.propTypes = {
    onChange: PropTypes.func.isRequired,
    i18n: PropTypes.shape({}).isRequired,
    modeling: PropTypes.func.isRequired,
    members: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    formValues: PropTypes.shape({}).isRequired
};

DateInput.displayName = 'date';

export default DateInput;
