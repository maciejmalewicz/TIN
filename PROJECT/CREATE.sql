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