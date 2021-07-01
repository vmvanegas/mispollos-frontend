import * as moment from 'moment';

export function setValidationDates(element: any, date: Date, option: string) {
    let setDate: string
    setDate = moment(date).format(); 
    setDate = setDate.substring(0, setDate.indexOf('T'))
    console.log(setDate)
    element.setAttribute(option, setDate);
}