import requests
import json
from decimal import Decimal
from functools import reduce
from itertools import product
import numpy as np
import PartialsCalculator as pc

import boto3

dynamodb = boto3.resource("dynamodb")
table = dynamodb.Table("PartialOptimiserResults")


# # AtR: List[float], Probability_AtR: List[float]) -> List[Tuple]
def main(event, context):
    print("EVENT: ", event)
    AtR = event["R"]
    Probability_AtR = event["P_AtR"]
    total_shares = event["total_shares"]
    id = event["id"]

    # Begin by setting dDB table status to calculating
    calculating_response = table.update_item(
        Key={
            "id": id,
        },
        UpdateExpression="set calculationStatus=:val1",
        ExpressionAttributeValues={
            ":val1": "calculating",
        },
        ReturnValues="UPDATED_NEW",
    )

    print("calculating_response: ", calculating_response)

    partials_perc_list = list(product(range(0, 101), repeat=len(AtR)))
    results_array = []

    for partial_tuple in partials_perc_list:
        # ----Optimise for speed
        # If there is not a closing partial, then profit is left on the table
        if 100 not in partial_tuple:
            continue
        # If there are more than one 100% partial, it's meaningless.
        if partial_tuple.count(100) > 1:
            continue
        # If there are partials after a 100% partial, it's meaningless.
        if 100 in partial_tuple:
            i = partial_tuple.index(100)
            end = partial_tuple[i + 1 :]
            if sum(list(end)) != 0:
                continue

        cumsum = pc.Caclulate_CumSum_Profit(partial_tuple, AtR, total_shares)
        total = pc.Total_R(Probability_AtR, cumsum, total_shares)
        results_array.append((partial_tuple, total))

    sorted_array = sorted(results_array, key=lambda x: x[1], reverse=True)

    responseBody = {"results": sorted_array[:20], "calculations": len(results_array)}

    # Need to convert float to decimal as dDB doesn't accept float
    decimal_data = json.loads(json.dumps(responseBody), parse_float=Decimal)

    print("decimal_data = ", decimal_data)

    # Finalise by setting dDB table status to finished
    final_response = table.update_item(
        Key={
            "id": id,
        },
        UpdateExpression="set calculationStatus=:val1, results=:val2, calculations=:val3",
        ExpressionAttributeValues={
            ":val1": "finished",
            ":val2": decimal_data["results"],
            ":val3": decimal_data["calculations"],
        },
        ReturnValues="UPDATED_NEW",
    )

    print("final_response: ", final_response)

    response = {
        "statusCode": 200,
        "headers": {"my_header": "my_value"},
        "body": json.dumps(responseBody),
        "isBase64Encoded": False,
    }

    return response


if __name__ == "__main__":
    main("", "")
