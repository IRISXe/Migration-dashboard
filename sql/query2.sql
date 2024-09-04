select name, cnt  from (
select  1 sno , 'Customer Account' Name, floor( dbms_random.value(1, 1000)) CNT from dual
union all
select   3 sno , 'Contact', floor( dbms_random.value(1, 1000)) CNT from dual
union all 
select  2 sno , 'Billing Account', floor( dbms_random.value(1, 1000)) CNT from dual
union all
select  4 sno , 'Address', floor( dbms_random.value(1, 1000)) CNT from dual
union all
select  5 sno , 'Asset', floor( dbms_random.value(1, 1000)) CNT from dual) order by sno