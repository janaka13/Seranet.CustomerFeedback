namespace CustomerFeedback.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class is_viewd : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Appraisals", "is_viewed", c => c.Int(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Appraisals", "is_viewed");
        }
    }
}
