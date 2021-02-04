drop table ingredient_usage;
drop table kebab;
drop table ingredient;
drop table app_user;

create table kebab(
	id_kebab serial primary key,
	meal_name varchar(50),
    meal_cost integer,
    meal_description varchar(200)
);

create table ingredient_usage(
	id_usage serial primary key,
    kebab bigint unsigned,
    ingredient bigint unsigned,
    amount varchar(20)
);

create table ingredient (
	id_ingredient serial primary key,
	ingredient_name varchar(40),
    ingredient_type varchar(30)
);

create table app_user(
	id_user serial primary key,
    user_login varchar(30),
    user_password varchar(60),
    first_name varchar(30),
    last_name varchar(30),
    roles varchar(200)
);

alter table ingredient_usage
add foreign key (kebab) references kebab(id_kebab);

alter table ingredient_usage
add foreign key (ingredient) references ingredient(id_ingredient);

insert into ingredient(ingredient_name, ingredient_type)
values ('chicken', 'meat'); 
-- 1

insert into ingredient(ingredient_name, ingredient_type)
values ('beef', 'meat');
-- 2

insert into ingredient(ingredient_name, ingredient_type)
values ('salad', 'vegetables');
-- 3

insert into ingredient(ingredient_name, ingredient_type)
values ('pickle', 'vegetables');
-- 4

insert into ingredient(ingredient_name, ingredient_type)
values ('onion', 'vegetables');
-- 5

insert into ingredient(ingredient_name, ingredient_type)
values ('tomato', 'vegetables');
-- 6

insert into ingredient(ingredient_name, ingredient_type)
values ('cheese', 'milk products');
-- 7

insert into ingredient(ingredient_name, ingredient_type)
values ('spicy sauce', 'sauces');
-- 8

insert into ingredient(ingredient_name, ingredient_type)
values ('garlic sauce', 'sauces');
-- 9

insert into kebab(meal_name, meal_cost, meal_description)
values ('Regular chicken', 1300, 'Classic, well known taste, loved by milions!');

insert into ingredient_usage(kebab, ingredient, amount)
values (1, 1, 'MEDIUM');

insert into ingredient_usage(kebab, ingredient, amount)
values (1, 3, 'MEDIUM');

insert into ingredient_usage(kebab, ingredient, amount)
values (1, 4, 'SMALL');

insert into ingredient_usage(kebab, ingredient, amount)
values (1, 5, 'MEDIUM');

insert into ingredient_usage(kebab, ingredient, amount)
values (1, 9, 'MEDIUM');

insert into kebab(meal_name, meal_cost, meal_description)
values ('Beef special', 1700, 'Big kebab with finest beef only in our restaurant!');

insert into ingredient_usage(kebab, ingredient, amount)
values (2, 2, 'HUGE');

insert into ingredient_usage(kebab, ingredient, amount)
values (2, 4, 'SMALL');

insert into ingredient_usage(kebab, ingredient, amount)
values (2, 5, 'MEDIUM');

insert into ingredient_usage(kebab, ingredient, amount)
values (2, 5, 'SMALL');

insert into ingredient_usage(kebab, ingredient, amount)
values (2, 8, 'MEDIUM');

insert into ingredient_usage(kebab, ingredient, amount)
values (2, 9, 'MEDIUM');

insert into kebab(meal_name, meal_cost, meal_description)
values ('Spicy devil', 1500, 'Kebab for the bravest, burning you deeply from the inside!');

insert into ingredient_usage(kebab, ingredient, amount)
values (3, 2, 'MEDIUM');

insert into ingredient_usage(kebab, ingredient, amount)
values (3, 3, 'MEDIUM');

insert into ingredient_usage(kebab, ingredient, amount)
values (3, 5, 'MEDIUM');

insert into ingredient_usage(kebab, ingredient, amount)
values (3, 6, 'MEDIUM');

insert into ingredient_usage(kebab, ingredient, amount)
values (3, 7, 'SMALL');

insert into ingredient_usage(kebab, ingredient, amount)
values (3, 8, 'HUGE');

insert into kebab(meal_name, meal_cost, meal_description)
values ('XXL MONSTER', 2000, 'Kebab made of 2 kebabs. Nothing to add!');

insert into ingredient_usage(kebab, ingredient, amount)
values (4, 1, 'HUGE');

insert into ingredient_usage(kebab, ingredient, amount)
values (4, 2, 'HUGE');

insert into ingredient_usage(kebab, ingredient, amount)
values (4, 3, 'HUGE');

insert into ingredient_usage(kebab, ingredient, amount)
values (4, 4, 'MEDIUM');

insert into ingredient_usage(kebab, ingredient, amount)
values (4, 5, 'HUGE');

insert into ingredient_usage(kebab, ingredient, amount)
values (4, 6, 'HUGE');

insert into ingredient_usage(kebab, ingredient, amount)
values (4, 7, 'HUGE');

insert into ingredient_usage(kebab, ingredient, amount)
values (4, 8, 'HUGE');

insert into ingredient_usage(kebab, ingredient, amount)
values (4, 9, 'HUGE');

insert into app_user(user_login, user_password, roles, first_name, last_name)
values ('Admin123', 'Password123', 'ADMIN', 'Arnold', 'Kasztan');

insert into app_user(user_login, user_password, roles, first_name, last_name)
values ('User123', 'Password123', 'USER', 'Nabuchodonozor', 'Smith');

