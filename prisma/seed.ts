import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const hashedPassword = await bcrypt.hash("admin123", 12);
  const adminUser = await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      email: "admin@example.com",
      name: "Admin User",
      password: hashedPassword,
      role: "ADMIN",
    },
  });

  // Create categories
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: "technology" },
      update: {},
      create: {
        name: "Technology",
        slug: "technology",
      },
    }),
    prisma.category.upsert({
      where: { slug: "finance" },
      update: {},
      create: {
        name: "Finance",
        slug: "finance",
      },
    }),
    prisma.category.upsert({
      where: { slug: "lifestyle" },
      update: {},
      create: {
        name: "Lifestyle",
        slug: "lifestyle",
      },
    }),
  ]);

  // Create blog posts
  const posts = await Promise.all([
    prisma.blogPost.upsert({
      where: { slug: "best-laptops-2024" },
      update: {},
      create: {
        title: "Best Laptops for 2024",
        slug: "best-laptops-2024",
        excerpt:
          "Discover the top laptops that offer the best performance and value this year.",
        content: `
# Best Laptops for 2024

The laptop market is constantly evolving, and 2024 brings some exciting new options for consumers. Whether you're a student, professional, or casual user, there's a perfect laptop out there for you.

## Top Picks

### 1. MacBook Pro M3
The latest MacBook Pro with M3 chip offers incredible performance and battery life. Perfect for creative professionals and power users.

### 2. Dell XPS 13 Plus
A premium Windows laptop with a stunning display and excellent build quality. Great for business users.

### 3. Lenovo ThinkPad X1 Carbon
The classic business laptop with outstanding keyboard and durability. Ideal for corporate environments.

## What to Consider

When choosing a laptop, consider:
- Performance requirements
- Battery life needs
- Portability
- Budget constraints
- Software compatibility

Make sure to check out our affiliate links below for the best deals on these laptops!
        `,
        coverImage:
          "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800",
        categoryId: categories[0].id,
        authorId: adminUser.id,
      },
    }),
    prisma.blogPost.upsert({
      where: { slug: "investment-strategies" },
      update: {},
      create: {
        title: "Investment Strategies for Beginners",
        slug: "investment-strategies",
        excerpt:
          "Learn the fundamentals of investing and start building your wealth today.",
        content: `
# Investment Strategies for Beginners

Investing can seem overwhelming at first, but with the right approach, anyone can start building wealth. Here are some proven strategies for beginners.

## Getting Started

### 1. Emergency Fund First
Before investing, ensure you have 3-6 months of expenses saved in an emergency fund.

### 2. Start with Index Funds
Index funds provide diversification and typically outperform actively managed funds over time.

### 3. Dollar-Cost Averaging
Invest a fixed amount regularly, regardless of market conditions. This reduces the impact of market volatility.

## Investment Options

- **Stocks**: Ownership in companies
- **Bonds**: Lending money to companies or governments
- **ETFs**: Exchange-traded funds that track indexes
- **Real Estate**: Property investment through REITs

## Risk Management

Remember to diversify your portfolio and never invest more than you can afford to lose. Consider consulting with a financial advisor for personalized advice.
        `,
        coverImage:
          "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800",
        categoryId: categories[1].id,
        authorId: adminUser.id,
      },
    }),
    prisma.blogPost.upsert({
      where: { slug: "healthy-living-tips" },
      update: {},
      create: {
        title: "Healthy Living Tips for Busy Professionals",
        slug: "healthy-living-tips",
        excerpt:
          "Simple ways to maintain a healthy lifestyle even with a demanding career.",
        content: `
# Healthy Living Tips for Busy Professionals

Maintaining a healthy lifestyle while juggling a demanding career can be challenging, but it's definitely achievable. Here are some practical tips.

## Nutrition

### Meal Prep
Spend a few hours on Sunday preparing meals for the week. This saves time and ensures you eat healthy food.

### Smart Snacking
Keep healthy snacks like nuts, fruits, and protein bars at your desk to avoid unhealthy vending machine choices.

### Hydration
Keep a water bottle at your desk and aim to drink at least 8 glasses of water daily.

## Exercise

### Micro Workouts
You don't need hours at the gym. Try 10-minute workouts throughout the day:
- Morning stretches
- Lunchtime walks
- Evening yoga

### Active Commuting
Consider walking or cycling to work if possible. Even getting off the bus a stop early helps.

## Mental Health

### Stress Management
Practice mindfulness, meditation, or deep breathing exercises to manage stress.

### Work-Life Balance
Set boundaries and make time for hobbies and relationships outside of work.

## Sleep

Prioritize 7-9 hours of quality sleep. Create a bedtime routine and keep your bedroom cool and dark.
        `,
        coverImage:
          "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800",
        categoryId: categories[2].id,
        authorId: adminUser.id,
      },
    }),
  ]);

  // Create affiliate links
  await Promise.all([
    prisma.affiliateLink.upsert({
      where: { slug: "amazon-laptops" },
      update: {},
      create: {
        title: "Amazon Laptops",
        slug: "amazon-laptops",
        url: "https://amazon.com/laptops",
        program: "Amazon Associates",
        postId: posts[0].id,
      },
    }),
    prisma.affiliateLink.upsert({
      where: { slug: "robinhood-investing" },
      update: {},
      create: {
        title: "Robinhood Investing",
        slug: "robinhood-investing",
        url: "https://robinhood.com",
        program: "Robinhood",
        postId: posts[1].id,
      },
    }),
    prisma.affiliateLink.upsert({
      where: { slug: "fitness-equipment" },
      update: {},
      create: {
        title: "Fitness Equipment",
        slug: "fitness-equipment",
        url: "https://amazon.com/fitness",
        program: "Amazon Associates",
        postId: posts[2].id,
      },
    }),
  ]);

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
