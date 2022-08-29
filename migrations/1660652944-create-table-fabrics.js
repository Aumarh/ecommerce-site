// adding
exports.up = async (sql) => {
  await sql`
    CREATE TABLE fabrics (
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	slug varchar(50) NOT NULL,
  name varchar(50) NOT NULL,
  category varchar(50) NOT NULL,
  price varchar(10) NOT NULL,
	quantity varchar(10) NOT NULL,
	description varchar(100) NOT NULL
	)
  `;
};

exports.down = async (sql) => {
  await sql`
    DROP TABLE fabrics
  `;
};
