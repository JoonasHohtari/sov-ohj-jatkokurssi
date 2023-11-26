import {StyleSheet} from 'react-native';

const primaryColor = '#333';
const secondaryColor = '#666';
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
    padding: 16,
    backgroundColor: backgroundColor,
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
  iconContainer: {
    alignItems: 'center',
    marginBottom: 12,
  },
  footer: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 10,
    backgroundColor: primaryColor,
  },
  footerText: {
    fontSize: 12,
    color: primaryColor,
  },
  label: {
    ...font.bold,
    fontSize: 16,
  },
  data: {
    ...font.normal,
    fontSize: 16,
    color: secondaryColor,
  },
  descriptionContainer: {
    backgroundColor: containerBackgroundColor,
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  sectionTitle: {
    ...font.bold,
    fontSize: 18,
    marginBottom: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
});
