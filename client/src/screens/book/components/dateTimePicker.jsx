import { Stack, TextField } from "@mui/material";
import {
  LocalizationProvider,
  DatePicker,
  TimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const DateTimePicker = ({ startDate, setStartDate, startTime, setStartTime, endDate, setEndDate, endTime, setEndTime, userRole }) => {
  console.log("This is the DateTimePicker role" , userRole);
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack spacing={3}>
        {userRole === "ADMIN" && (
          <>
            <DatePicker label="Start Date" value={startDate} onChange={setStartDate} renderInput={(params) => <TextField {...params} />} minDate={startDate} />
            <TimePicker label="Start Time" value={startTime} onChange={setStartTime} minutesStep={1} renderInput={(params) => <TextField {...params} />} />
            <DatePicker label="End Date" value={endDate} onChange={setEndDate} renderInput={(params) => <TextField {...params} />} minDate={startDate} />
          </>
        )}

        {userRole === "USER" && (
          <DatePicker label="Date" value={startDate} onChange={setStartDate} renderInput={(params) => <TextField {...params} />} disabled />
        )}

        <TimePicker label="End Time" value={endTime} onChange={setEndTime} minutesStep={1} renderInput={(params) => <TextField {...params} />} />
      </Stack>
    </LocalizationProvider>
  );
};

export default DateTimePicker;
