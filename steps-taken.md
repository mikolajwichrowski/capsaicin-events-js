# 0. Architect
0. Initialize project, install all packages and init nest js project with typescript https://www.thisdot.co/blog/introduction-to-restful-apis-with-nestjs
  - npm init
  - npm i -g @nestjs/cli
  - nest new rest-api
1. Install and initialize orm https://www.prisma.io/docs/getting-started/setup-prisma/add-to-existing-project/relational-databases-typescript-postgres
3. Create the user models and routes following the docs on https://docs.nestjs.com/controllers
4. Test by creating a user
5. Create auth middleware to check user

---

# 1. Events
1. Create event models in prisma
2. Create event service and module
3. Make GET/POST routes

---

# 2. Attendees
1. Create attendees model and service
2. Put attendees service in event controller
3. Make attendees detail route on event controller
4. Make register attendees on event controller

---

# 3 Files
1. Create file models in prisma
2. Create file service
3. Make files detail route on event controller
4. Add file upload techinique to upload endpoint https://docs.nestjs.com/techniques/file-upload on event controller

---

# 4 Attending an event
1. Create reactions models in prisma
2. Create reaction service
3. Make react detail route on event controller

---

# 5 Commenting

1. Add commenting type to reaction service and model.