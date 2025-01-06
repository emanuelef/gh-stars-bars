import pandas as pd

# Load the CSV file
input_csv = "input.csv"  # Replace with your actual input file path
output_csv = "output.csv"  # Replace with your desired output file path
repo_name = "Rust"  # Name of your repository

# Read the input CSV
data = pd.read_csv(input_csv, parse_dates=["date"], dayfirst=True)

# Ensure the data is sorted by date
data = data.sort_values("date")

# Group by the month and year
data["month"] = data["date"].dt.to_period("M")
monthly_stars = data.groupby("month")["total-stars"].last().reset_index()

# Create the output DataFrame
output = pd.DataFrame(
    {
        "date": monthly_stars["month"].dt.to_timestamp() + pd.offsets.MonthBegin(1),
        "name": repo_name,
        "value": monthly_stars["total-stars"],
    }
)

# Save the output to CSV
output.to_csv(output_csv, index=False)

print("Output saved to:", output_csv)
