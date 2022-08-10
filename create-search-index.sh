generate_post_data() {
    cat <<EOF
{
  "collectionName":"movies",
  "database":"test",
  "name": "default",
  "mappings": {
    "dynamic": false,
    "fields": {
      "original_title": [
        {
          "type": "autocomplete",
          "tokenization": "edgeGram",
          "minGrams": 2,
          "maxGrams": 15,
          "foldDiacritics": true
        }
      ]
    }
  }
}
EOF
}

PUBLIC_KEY=$MONGODB_PUBLIC_KEY
PRIVATE_KEY=$MONGODB_PRIVATE_KEY
PROJECT_ID=$MONGODB_PROJECT_ID
CLUSTER_NAME=$MONGODB_CLUSTER_NAME
curl --user "$PUBLIC_KEY:$PRIVATE_KEY" --digest \
    --header "Content-Type: application/json" \
    --include \
    --request POST "https://cloud.mongodb.com/api/atlas/v1.0/groups/$PROJECT_ID/clusters/$CLUSTER_NAME/fts/indexes?pretty=true" \
    --data "$(generate_post_data)"
