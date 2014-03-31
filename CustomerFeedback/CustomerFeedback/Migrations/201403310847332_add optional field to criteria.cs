namespace CustomerFeedback.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addoptionalfieldtocriteria : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Criteria", "optional", c => c.Int(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Criteria", "optional");
        }
    }
}
