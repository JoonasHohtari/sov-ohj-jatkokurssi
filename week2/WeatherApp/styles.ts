import {StyleSheet} from 'react-native';

const primaryColor = '#333';
const backgroundColor = '#d3d3d3';
const containerBackgroundColor = '#f9f9f9';

const font = {
  normal: {
    fontSize: 16,
    fontWeight: 'normal' as const,
    color: primaryColor,
  },
  bold: {
    fontSize: 16,
    fontWeight: 'bold' as const,
    color: primaryColor,
  },
  // Add more font variations as needed
};

export const extraButtonStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 5, // Align buttons with equal space between them
  },
  extraButton: {
    flex: 1,
    height: 80, // Set a fixed height for the buttons
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center', // Center content vertically
    marginTop: 10, // Add margin between buttons
    marginHorizontal: 2, // Add margin between buttons
    marginBottom: 5,
  },
  extraButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor,
    padding: 12,
  },
  heading: {
    ...font.bold,
    fontSize: 24,
    marginBottom: 16,
  },
  location: {
    ...font.bold,
    fontSize: 20,
    marginBottom: 12,
  },
  weatherInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  temperature: {
    ...font.bold,
    fontSize: 18,
    marginBottom: 8,
    marginTop: 8,
  },
  temperatureIcon: {
    ...font.bold,
    fontSize: 24,
    marginRight: 8,
  },
  temperatureValue: {
    fontWeight: 'bold',
  },
  description: {
    ...font.normal,
    fontSize: 18,
    marginBottom: 12,
  },
  icon: {
    width: 50,
    height: 50,
  },
  label: {
    ...font.bold,
    fontSize: 16,
    marginTop: 10,
  },
  data: {
    ...font.normal,
    fontSize: 16,
    color: primaryColor,
    marginTop: 10,
  },
  descriptionContainer: {
    flex: 1,
    backgroundColor: containerBackgroundColor,
    padding: 16,
    borderRadius: 4,
  },
  refreshButtonContainer: {
    marginTop: 10,
    justifyContent: 'flex-end',
  },
  refreshButton: {
    width: 'auto',
    height: 50,
    backgroundColor: '#3498db',
    padding: 5,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  sectionTitle: {
    ...font.bold,
    fontSize: 18,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 10,
  },
  footer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: primaryColor,
    marginTop: 16,
  },
  footerText: {
    fontSize: 12,
    color: primaryColor,
  },
  cardContainer: {
    marginBottom: 10, // Adjust this for spacing between cards
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#000',
    padding: 16,
  },
});
