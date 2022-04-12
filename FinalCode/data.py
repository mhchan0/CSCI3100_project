import csv
import sys

def returnData(stock, t):

    time = int(t)

    filename = "./stock_data/" + stock + ".csv"
    
    fields = []
    rows = []
    
    with open(filename, 'r') as csvfile:

        csvreader = csv.reader(csvfile)

        fields = next(csvreader)

        for row in csvreader:
            rows.append(row)

    if (time >= 0):
        time = -1

    if (time == -1):
        for row in rows[-1:]:
            for col in row:
                print(col,end=" ")
    
    else:
        for row in rows[time:time+1]:
            for col in row:
                print(col,end=" ")



s = sys.argv[1]
t = sys.argv[2]
returnData(s, t)
