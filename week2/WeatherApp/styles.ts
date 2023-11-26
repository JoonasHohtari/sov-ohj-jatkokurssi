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

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor,
    padding: 16,
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
    flex: 3,
    backgroundColor: containerBackgroundColor,
    padding: 16,
    borderRadius: 4,
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
  refreshButton: {
    backgroundColor: '#3498db', // or any color you prefer
    padding: 10,
    borderRadius: 5,
    marginTop: 16,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff', // white text color
    fontSize: 16,
    fontWeight: 'bold',
  },
});
