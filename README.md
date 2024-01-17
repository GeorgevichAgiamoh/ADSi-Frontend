# Stable Shield Solutions | ADSI

## Infos
Project: ADSI portal (frontend)

Developer: Daniel, remote fullstack engineer, Stable Shield Solutions

Started: 28/12/23



## Progress update

STARTED: 28/12/23

Working on last figma page (3/3)

> Roadmap adjusted to meet new timeline demands

### UI

| Done          | Upcoming      |
| ------------- | ------------- |
| Register      | Member Payment|
| Payment       |               |
| Login1        |               |
| Login2        |               |
| Login3        |               |
| Reset1        |               |
| Reset2        |               |
| Verification  |               |
| Admin Portal  |               |
| Adm Dashboard |               |
| Adm Dir 1     |               |
| All Dir done  |               |
| All Msg done  |               |
| Adm Pay Types |               |
| Adm Pay Create|               |
| All pay done  |               |
| All settings  |               |
| Admin UI Done |               |
| Member Dash   |               |
| Member Profile|               |

### Code (actions)

| Done          | Upcoming      |
| ------------- | ------------- |
| Admin Dash    | Messaging     |
| Admin Dir     | Member pays 2 |
| Admin pays    |               |
| Admin setns   |               |
| Member pays 1 |               |
|               |               |
|               |               |
|               |               |
|               |               |



## Data Structure

> (,,) means implied. All time are in milliseconds since Epoch. (?) means optional



### Member basic info

 Collected on registration

```json
{
  "memid": "(ADSI Number - 8 char)",
  "fname": "(First Name)",
  "lname": "(Last Name)",
  "mname": "(,,)",
  "eml": "(,,)",
  "phn": "(,,)",
  "verif": "(0/1)",
  "pay": "(0/1/2)",
}
```



### Member general info

 Collected after registration

```json
{
  "memid": "(,,)",
  "sex": "(,,)",
  "marital": "(,,)",
  "dob": "(,,)",
  "nationality": "(,,)",
  "state": "(,,)",
  "lga": "(,,)",
  "town": "(,,)",
  "addr": "(,,)",
  "job": "(,,)",
  "nin": "(,,)",
  "kin_fname": "(,,)",
  "kin_lname": "(,,)",
  "kin_mname": "(,,)",
  "kin_type": "(,,)",
  "kin_phn": "(,,)",
  "kin_addr": "(,,)",
  "kin_eml": "(,,)",
}
```




### Member financial info

 Collected after registration

```json
{
  "memid": "(,,)",
  "bnk": "(Bank Code (3 digits code))",
  "anum": "(Account Number)",
  "aname": "(Account Name)",
}
```



### Highlights for Admin (highlightEle)

 Shown on admin's dashboard (Not a table, built by endpoint)

```json
{
  "totalUsers": "(,,)",
  "totalMales": "(,,)",
  "totalFemales": "(,,)",
}
```



### Announcement (annEle)


```json
{
  "title": "(,,)",
  "msg": "(,,)",
  "time": "(,,)",
}
```



### Verification Stat (verifStat)

```json
{
  "totalVerified": "(,,)",
  "totalUnverified": "(,,)",
}
```

### Payment Ref format

(adsi)-(payId)-(amt)-(memid)-(mills)

pay Ids: (Table = pays(ID). Eg pays0, pays1)

0 - One time reg fee 
1 - Annual Due
2 - Investment




### Payment Record (PayRecordEle)

```json
{
  "memid": "(,,)",
  "ref": "(See format above)",
  "name": "(,,)",
  "time": "(,,)",
  "year": "(? ,,)",
  "shares": "(? ,,)",
}
```





### ADSI Info (adsiInfoEle)

```json
{
  "memid":"(,,)",
  "cname":"(,,)",
  "regno": "(,,)",
  "addr": "(,,)",
  "nationality":"(,,)",
  "state": "(,,)",
  "lga": "(,,)",
  "aname":"(,,)",
  "anum": "(,,)",
  "bnk": "(,,)",
  "pname":"(,,)",
  "peml": "(,,)",
  "pphn": "(,,)",
  "paddr":"(,,)",
}
```






### Admin User (adminUserEle)

```json
{
  "memid":"(,,)",
  "lname":"(,,)",
  "oname": "(,,)",
  "eml": "(,,)",
  "role":"(,,)",
  "pd1": "(,,)",
  "pd2": "(,,)",
  "pp1":"(,,)",
  "pp2": "(,,)",
  "pm1": "(,,)",
  "pm2":"(,,)",
}
```
