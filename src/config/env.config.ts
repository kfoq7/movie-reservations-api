import envVar from 'env-var'

const { get } = envVar

export const authEnvConfig = {
  jwtSecret: get('SECRET_KEY').required().asString(),
}

export const mysqlEnvConfig = {
  username: get('MYSQL_USERNAME').required().asString(),
  password: get('MYSQL_PASSWORD').required().asString(),
}
