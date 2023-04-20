import * as React from "react";
import { Navbar } from "../../components/navbar/navbar";
import { Calendar } from './components/calendar/calendar';
import { Typography, Box } from '@mui/material';
import { StudentAppointments } from './components/student-appointments/student-appointments';
import { StudentAppointmentsCheckRequest } from '../../api/dbEndpointTypes';
import { checkStudentAppointmentsCheckRequest } from '../../api/endpointRequests';
import "../Home/student-home.css";

interface Props {}

export const StudentHome: React.FC<Props> = () => {
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(null);
  const [appointments, setAppointments] = React.useState<any[] | null>([]);

  const appointmentsRequest = async (date: Date) => {
    const newAppointmentsRequest: StudentAppointmentsCheckRequest = {
      id: localStorage.getItem("userId"),
      date: date.toISOString().substring(0, 10)
    };

    const response = await checkStudentAppointmentsCheckRequest(newAppointmentsRequest);
    return response;
  };

  React.useEffect(() => {
    if (selectedDate) {
      appointmentsRequest(selectedDate).then((response) => {
        setAppointments(response);
      });
    }
  }, [selectedDate]);

  return (
    <div>
      <div className="top-content">
        <Navbar />
        <div className="container">
          {/* Calendar */}
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Calendar onDateChange={(date: Date | null) => setSelectedDate(date)} />
          </Box>

          {/* Appointments */}
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            {selectedDate ? (
              <Typography variant="h4">
                {new Date(selectedDate).toLocaleDateString()}
                {appointments && <StudentAppointments />}
              </Typography>
            ) : (
              <Typography variant="h4">
                <StudentAppointments />
                No date selected
              </Typography>
            )}
          </Box>
        </div>
      </div>
    </div>
  );
};