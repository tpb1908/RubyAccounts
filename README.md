# README
Done so far-
* User account setup
* Secure cookie storage to remember user
* One mode of typing test, not yet implemented within this site
* Updating and deleting users
* Email authentication for user accounts
* Password reset for user accounts
* Responsive design for mobile

Reference-
Activate all users from console - User.all.each do |n| n.update_attribute(:activated, true) end






---------------------------------------------------------------------------------------------------------------------------------------------------

TODO-

* Models for-
* Test data set e.g. the words used
* Test results
* Analysis of a users performance

* User-
* Has many:
* Result models
* Test models
* Word sets
* Also needs:
  * Language
  * Keyboard layout
  * Average score


* Result model-
* Has one test model
* CPM --> WPM
* No. of errors
* Words where errors where made
* Serialized array of delta time between each character press
* Serialized array of average delta between different characters- Sorted 
* Layout used- e.g. single word, single line, multi line etc
* Time frame used- set time or unlimited

* Test model-
* Has one word set (The array of words used)
* Number of other parameters:
  * Average score
  * Distribution of scores- Threshold for each percent
  * No. times taken
  * Top score
  * Boolean, system or user


* Word set model-
* Serialized array of text
* Word values can either be stored here, or computed elsewhere


| User | Word set | Test |
| ---- | -------- | ---- |
| id:int | id:int | id:int |
| name:string | owner- user id or system :int | language:string? | user id:int |
| remember token & digest | the words:serialized | test parameters |
| activation token & digest | date created | cpm -> WPM |
| reset token & digest | public or private | actual WPM:int |
| reset sent time | use of special characters (For filtering) | delta array |
| email-downcase | name | sorted array of average deltas |
| | last update: datetime| 