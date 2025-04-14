-- AddForeignKey
ALTER TABLE "RedirectLog" ADD CONSTRAINT "RedirectLog_slug_fkey" FOREIGN KEY ("slug") REFERENCES "Link"("slug") ON DELETE RESTRICT ON UPDATE CASCADE;
