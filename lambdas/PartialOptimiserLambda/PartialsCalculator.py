# For detailed notes, see DayTraderTools_DevNotes

from functools import reduce
import numpy as np
from typing import List, Set, Dict, Tuple, Optional

# Returns an array where the profit has been cumulatively summed.
def Caclulate_CumSum_Profit(Partials: List[int], AtR: List[float], total_shares: int) -> List[float]:
    remaining_shares = total_shares
    total_profit = 0
    profit_array = []
    for idx, partial in enumerate(Partials):
        # Percentage of shares to close
        shares_to_close = remaining_shares * (partial / 100)
        # print(shares_to_close)
        remaining_shares = remaining_shares - shares_to_close
        profit = shares_to_close * AtR[idx]
        profit_array.append(profit)
        total_profit += profit
    return np.cumsum(profit_array)


# ---------Now we can calculate profit according to probability of outcome across 1000 trades

# Out of 1000 trades, 70% are 2R, 60% are 3R, 30% are 4R, and 5% are 6R. This means that of the 700 trades that reach 2R, 600 will go on to be 3R trades. That means that
# only 100 trades will be purely 2R trades (2R, then back to BE). Of the 600, 300 will go on to be 4R, leaving 300 and 3R. Finally, 50 will be full R trades, so 250 will be left at 4R
# The last element for number of trades doesn't need updating.
# If the probabilities were 70, 60, 10, and we had 1000 trades, then the last will always be equal to probability * no_of_trades (= 100)
def Total_R(ProbabilityAtR, CumSum, total_shares):
    no_of_trades = 1000
    no_of_trades_AtEachR = []
    for probability in ProbabilityAtR:
        # Using the probability, calculate the number of trades that will go through each R.
        no_of_trades_AtEachR.append(no_of_trades * (probability / 100))

    # Calculate the number of trades that only hit each R, then turn around and go to BE.
    no_of_winners_AtR = []
    for idx, trades in enumerate(no_of_trades_AtEachR):
        if idx == len(no_of_trades_AtEachR) - 1:
            no_of_winners_AtR.append(no_of_trades_AtEachR[-1])
            # print(no_of_winners_AtR)
            break
        no_of_winners_AtR.append(trades - no_of_trades_AtEachR[idx + 1])

    # Now simply multiply the no_of_winners_AtR by the realised profit at each R. This will tell you how much money each trade that got to that R and turned around to BE
    # made. For example, if a trade that gets to 2R and drops 30%, then hits BE will make 0.6R, then 1000 of these will make 600R.
    x = []
    for idx, t in enumerate(CumSum):
        x.append(t * no_of_winners_AtR[idx])

    sum_of_winning_trades = reduce((lambda a, b: a + b), x)
    sum_of_losing_trades = (no_of_trades - no_of_trades_AtEachR[0]) * total_shares
    return (sum_of_winning_trades - sum_of_losing_trades) / total_shares

# Divide by total shares to get realised R
def total_r(total_profit, risk):
    return total_profit / risk