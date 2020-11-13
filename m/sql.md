# SQL

/ˈɛs kjuː ˈɛl/ or /ˈsiːkwəl/

Structured Query Language is a domain-specific language designed
for managing data held in a relational database. Designed by **Donald
D. Chamberlin** and **Raymond F. Boyce** in **1974**.

[Wikipedia](https://en.m.wikipedia.org/wiki/SQL)

```sql
-- comment lines starts with two consecutive minus signs '--'
-- define columns (name / type / default value / nullable)
CREATE TABLE person (
  id             DECIMAL      NOT NULL,
  firstname      VARCHAR(50)  NOT NULL,
  lastname       VARCHAR(50)  NOT NULL,
  date_of_birth  DATE,
  place_of_birth VARCHAR(50),
  ssn            CHAR(11),
  weight         DECIMAL DEFAULT 0 NOT NULL,
  CONSTRAINT person_pk PRIMARY KEY (id)
);
-- select one of the defined columns as the Primary Key and
-- guess a meaningful name for the Primary Key constraint: 'person_pk' may
-- be a good choice
```

```
select
order by
select distinct
where
limit
in
like
glob
left join
inner join
cross join
self-join
group by
union
full outer join
having
case
insert
update
delete
replace
data definition

data types
date & time
create table
primary key
foreign key
auto increment
alter table
drop table
create view
index
expression based index
trigger
vacuum
transaction
full-text search

dump
import csv
export csv

avg
count
max
min
sum
```
