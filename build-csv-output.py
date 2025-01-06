import requests
import pandas as pd
from datetime import datetime
import os
import io  # Import StringIO

# Input and output files
repos_file = "repos.txt"  # Text file containing the list of repositories
output_file = "combined_output.csv"  # Output CSV file

# URL template for fetching repository data
BASE_URL = "https://emafuma.mywire.org:8090/allStarsCsv?repo={repo}"


def fetch_repo_data(repo_name):
    """Fetch the CSV data for a given repository."""
    url = BASE_URL.format(repo=repo_name.lower())
    response = requests.get(url)
    if response.status_code == 200:
        return response.text
    else:
        print(f"Failed to fetch data for {repo_name}: {response.status_code}")
        return None


def process_csv_data(csv_data, repo_name):
    """Process the CSV data to aggregate total stars by month."""
    # Read CSV data into a pandas DataFrame
    df = pd.read_csv(
        io.StringIO(csv_data), parse_dates=["date"], dayfirst=True
    )  # Use io.StringIO here
    df["month"] = df["date"].dt.to_period("M")  # Extract the month

    # Group by month and take the last total-stars value for each month
    monthly_totals = df.groupby("month")["total-stars"].last().reset_index()
    monthly_totals["date"] = monthly_totals[
        "month"
    ].dt.to_timestamp() + pd.offsets.MonthBegin(1)
    monthly_totals["name"] = repo_name
    monthly_totals = monthly_totals.rename(columns={"total-stars": "value"})
    return monthly_totals[["date", "name", "value"]]


def main():
    # Read the list of repositories
    if not os.path.exists(repos_file):
        print(f"Repos file {repos_file} not found.")
        return

    with open(repos_file, "r") as file:
        repos = [line.strip() for line in file if line.strip()]

    # Process each repository
    all_data = []
    for repo in repos:
        print(f"Processing {repo}...")
        csv_data = fetch_repo_data(repo)
        if csv_data:
            processed_data = process_csv_data(csv_data, repo)
            all_data.append(processed_data)

    # Combine all data and save to a single CSV
    if all_data:
        combined_data = pd.concat(all_data, ignore_index=True)
        combined_data.to_csv(output_file, index=False)
        print(f"Combined data saved to {output_file}.")
    else:
        print("No data to combine.")


if __name__ == "__main__":
    main()
