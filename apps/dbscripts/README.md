# DB Scripts

Run in order on PostgreSQL:

1. `apps/dbscripts/000_schema.sql`
2. `apps/dbscripts/001_seed.sql`

Example:

```bash
psql "$DATABASE_URL" -f apps/dbscripts/000_schema.sql
psql "$DATABASE_URL" -f apps/dbscripts/001_seed.sql
```
