# Fridge-Access-Project

I had an unused Zigbee vibration sensor at home that was not used for any automation. Wanting to put my data skills to use, I decided to use it towards a data gathering project. Therefore, I placed it in the Fridge, as any other person would. I wanted to know, how many times a day, do I open the fridge ❄️, what are the most common hours, and what are the most common days. So far, I have only a few days of data, but will constantly adapt the project with new developments.

At the moment, I am using a Jupyter notebook with pandas, numpy, matplotlib alongside Bokeh and Plotly for visualizations. The current setup is that my Home Assistant VM captures Zigbee data from the sensor and exports it in a CSV file. Further down the road, I have in mind to automate this process.

## Analysis

I am analyzing how many times a day the fridge was opened and during what intervals. So far, I am using the following time intervals:

- **07:00-12:00** - Morning
- **12:00-17:00** - Afternoon
- **17:00-23:59** - Evening
- **Else** - Night

## Visualizations

I am using the following libraries for data visualization:
- **matplotlib**: For static plots.
- **Bokeh**: For interactive plots.
- **Plotly**: For interactive plots.

The data from the sensor is processed and visualized to provide insights into the usage patterns of the fridge.

---

This project is a work in progress, and I plan to add more features and automate the data collection process in the future.
