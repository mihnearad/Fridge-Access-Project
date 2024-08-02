import pandas as pd
import numpy as np


# Load data
df = pd.read_csv("Fridge_MotionSensor.csv")

# Datetime conversion with timezone handling
df["last_changed"] = pd.to_datetime(
    df["last_changed"], errors="coerce"
)  # Convert to datetime, coerce errors
df["last_changed_formatted"] = df["last_changed"].dt.strftime("%Y %B %d %H:%M")

# Prepare additional columns
df["date"] = df["last_changed"].dt.strftime("%Y-%m-%d")
df["time"] = df["last_changed"].dt.time
df["state_on"] = df["state"] == "on"  # Create a boolean column for 'state' == 'on'


df["time"] = df["last_changed"].dt.time


def categorize_time(time):
    """
    Categorizes the given time into one of the following categories: Morning, Afternoon, Evening, Night.

    Parameters:
    - time (datetime.time): The time to be categorized.

    Returns:
    - str: The category of the given time.

    """
    if (
        time >= pd.to_datetime("07:00").time()
        and time <= pd.to_datetime("12:00").time()
    ):
        return "Morning"
    if (
        time >= pd.to_datetime("12:00").time()
        and time <= pd.to_datetime("17:00").time()
    ):
        return "Afternoon"
    if (
        time >= pd.to_datetime("17:00").time()
        and time <= pd.to_datetime("23:59").time()
    ):
        return "Evening"
    else:
        return "Night"


df["time_interval"] = df["time"].apply(categorize_time)

# Filter data for 'on' state and group by date and time interval
opens_per_interval = (
    df[df["state_on"]]
    .groupby(["date", "time_interval"])
    .size()
    .reset_index(name="opens")
)

# Pivot table for visualization
pivot_table = opens_per_interval.pivot(
    index="date", columns="time_interval", values="opens"
).fillna(0)


pivot_table["Total"] = pivot_table.sum(axis=1)


# Reset index and save the pivot table with total as JSON
pivot_table.reset_index().to_json("processed_data.json", orient="records")
