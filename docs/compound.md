## Compound Transactions


##### Mint

Property | Data Type | Allowed Value | Required
------------ | ------------- | ------------- | -------------
tx_id | String | Any String | Yes
tx_type | String | `'COMPOUND_MINT'` | Yes
timestamp | String | ISO 8601 DateTime String | Yes
c_token_code | String | Any String | Yes
c_token_amount | String | Any String | Yes
supplied_code | String | Any String | Yes
supplied_amount | String | Any String | Yes
fee_tx_ids | Array | Array of Strings | No

##### Borrow

Property | Data Type | Allowed Value | Required
------------ | ------------- | ------------- | -------------
tx_id | String | Any String | Yes
tx_type | String | `'COMPOUND_BORROW'` | Yes
timestamp | String | ISO 8601 DateTime String | Yes
borrow_code | String | Any String | Yes
borrow_amount | String | Any String | Yes
fee_tx_ids | Array | Array of Strings | No

##### Redeem

Property | Data Type | Allowed Value | Required
------------ | ------------- | ------------- | -------------
tx_id | String | Any String | Yes
tx_type | String | `'COMPOUND_REDEEM'` | Yes
timestamp | String | ISO 8601 DateTime