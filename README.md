# Stable Shield Solutions | ADSI

## Info
Project: ADSI portal (frontend)
Developer: Daniel, remote fullstack engineer, Stable Shield Solutions
Started: 28/12/23



## Progress update

STARTED: 28/12/23

Working on last figma page (3/3)

> Roadmap adjusted to meet new timeline demands


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



## Data Structure

> (,,) means implied



### Member basic info

 Collected on registration

```json
{
  "memid": "(Member ID - 8 char)",
  "fname": "(First Name)",
  "lname": "(Last Name)",
  "mname": "(,,)",
  "eml": "(,,)",
  "phn": "(,,)",
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
}
```