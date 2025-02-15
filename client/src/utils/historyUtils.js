export const formatTime = (timeString) => {
    const date = new Date(timeString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };
  
  export const getTimelineWidth = (startTime, endTime) => {
    const dayStart = new Date().setHours(0, 0, 0, 0);
    const dayEnd = new Date().setHours(23, 59, 59, 999);
  
    const normalizedStartTime = new Date(startTime).getTime() - dayStart;
    const normalizedEndTime = new Date(endTime).getTime() - dayStart;
    const totalDayTime = dayEnd - dayStart;
  
    return ((normalizedEndTime - normalizedStartTime) / totalDayTime) * 100;
  };
  
  export const getStartPosition = (startTime) => {
    const dayStart = new Date();
    dayStart.setHours(0, 0, 0, 0);
  
    const startDate = new Date(startTime);
    const normalizedStartTime = new Date(dayStart);
    normalizedStartTime.setHours(
      startDate.getHours(),
      startDate.getMinutes(),
      startDate.getSeconds(),
      startDate.getMilliseconds()
    );
  
    const totalDayTime = new Date(dayStart).setHours(23, 59, 59, 999) - dayStart.getTime();
    return ((normalizedStartTime - dayStart.getTime()) / totalDayTime) * 100;
  };
  
  export const getTotalBookingHours = (startTime, endTime) => {
    const diffInMs = new Date(endTime) - new Date(startTime);
    const hours = Math.floor(diffInMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffInMs % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };
  