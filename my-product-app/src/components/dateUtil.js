import moment from "moment";

export const formatDateWithTime = (dateString) => {
  if (!dateString) return "Invalid Date"; // Gestion des dates nulles ou undefined
  return moment(dateString).format("MMMM Do, YYYY [at] h:mm"); // Format personnalisé
};
