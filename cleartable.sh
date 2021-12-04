table_name=forthepeople-app-b0936472-678c-4b92-8f2a-934e6006514b

aws dynamodb describe-table --table-name $table_name | jq '.Table | del(.TableId, .TableArn, .ItemCount, .TableSizeBytes, .CreationDateTime, .TableStatus, .LatestStreamArn, .LatestStreamLabel, .ProvisionedThroughput.NumberOfDecreasesToday, .ProvisionedThroughput.LastIncreaseDateTime)' > schema.json
aws dynamodb delete-table --table-name $table_name
sleep 5
aws dynamodb create-table --cli-input-json file://schema.json
rm schema.json