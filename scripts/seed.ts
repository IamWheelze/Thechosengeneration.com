/**
 * Seed Script for The Chosen Generation
 *
 * This script populates the database with demo data for testing.
 * Run with: npm run seed
 *
 * Prerequisites:
 * - Supabase project set up with migrations applied
 * - SUPABASE_SERVICE_ROLE_KEY in environment
 */

import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("Missing required environment variables")
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function seed() {
  console.log("🌱 Starting seed process...")

  try {
    // Create demo users (teachers and admins)
    console.log("Creating demo users...")

    const { data: adminUser, error: adminError } = await supabase.auth.admin.createUser({
      email: "admin@thechosengeneration.org",
      password: "demo-password-123",
      email_confirm: true,
      user_metadata: {
        name: "Admin User",
        role: "admin",
      },
    })

    if (adminError && !adminError.message.includes("already")) {
      console.error("Admin user error:", adminError)
    }

    const { data: teacherUser, error: teacherError } = await supabase.auth.admin.createUser({
      email: "teacher@thechosengeneration.org",
      password: "demo-password-123",
      email_confirm: true,
      user_metadata: {
        name: "Sarah Teacher",
        role: "teacher",
      },
    })

    if (teacherError && !teacherError.message.includes("already")) {
      console.error("Teacher user error:", teacherError)
    }

    const { data: parentUser, error: parentError } = await supabase.auth.admin.createUser({
      email: "parent@example.com",
      password: "demo-password-123",
      email_confirm: true,
      user_metadata: {
        name: "John Parent",
        role: "parent",
      },
    })

    if (parentError && !parentError.message.includes("already")) {
      console.error("Parent user error:", parentError)
    }

    // Insert users into public.users table
    if (adminUser?.user) {
      await supabase.from("users").upsert({
        id: adminUser.user.id,
        email: "admin@thechosengeneration.org",
        name: "Admin User",
        role: "admin",
      })
    }

    if (teacherUser?.user) {
      await supabase.from("users").upsert({
        id: teacherUser.user.id,
        email: "teacher@thechosengeneration.org",
        name: "Sarah Teacher",
        role: "teacher",
      })
    }

    if (parentUser?.user) {
      await supabase.from("users").upsert({
        id: parentUser.user.id,
        email: "parent@example.com",
        name: "John Parent",
        role: "parent",
      })
    }

    // Create demo class
    console.log("Creating demo class...")
    const { data: classData, error: classError } = await supabase
      .from("classes")
      .upsert({
        name: "Foundation School 1 - Group A",
        age_group: "6-8",
        level: "FS1",
        teacher_user_id: teacherUser?.user?.id,
        max_capacity: 15,
        schedule_day: "Saturday",
        schedule_time: "9:00 AM - 12:00 PM",
      })
      .select()
      .single()

    if (classError) {
      console.error("Class error:", classError)
    }

    // Create demo child
    console.log("Creating demo child...")
    if (parentUser?.user && classData) {
      const { data: childData, error: childError } = await supabase
        .from("children")
        .upsert({
          parent_user_id: parentUser.user.id,
          display_name: "Emma D.",
          first_name: "Emma",
          last_name: "Doe",
          date_of_birth: "2017-05-15",
          age_group: "6-8",
          gender: "female",
          class_id: classData.id,
          current_level: "FS1",
          pin_hash: "1234", // In production, this should be hashed
          photo_consent: true,
        })
        .select()
        .single()

      if (childError) {
        console.error("Child error:", childError)
      }

      // Create demo tasks
      console.log("Creating demo tasks...")
      const weekStart = new Date()
      weekStart.setDate(weekStart.getDate() - weekStart.getDay() + 1)

      const tasks = [
        { title: "Morning Prayer", type: "checkbox", points: 10 },
        { title: "Read John Chapter 3", type: "checkbox", points: 15 },
        { title: "Memory Verse: John 3:16", type: "teacher_approved", points: 20 },
        { title: "Prayer Reflection", type: "short_answer", points: 15 },
        { title: "Worship Practice", type: "checkbox", points: 10 },
      ]

      for (const task of tasks) {
        await supabase.from("tasks").insert({
          class_id: classData.id,
          week_start: weekStart.toISOString().split("T")[0],
          title: task.title,
          type: task.type,
          points: task.points,
          requires_approval: task.type === "teacher_approved",
          created_by_user_id: teacherUser?.user?.id,
        })
      }

      // Create demo awards
      console.log("Creating demo awards...")
      if (childData && teacherUser?.user) {
        const awards = [
          { badge_type: "prayer_warrior", title: "Prayer Warrior", reason: "Completed 5 days of prayer check-ins" },
          { badge_type: "faithful_student", title: "Faithful Student", reason: "Completed all assignments for the week" },
        ]

        for (const award of awards) {
          await supabase.from("awards").insert({
            child_id: childData.id,
            week_start: weekStart.toISOString().split("T")[0],
            badge_type: award.badge_type,
            title: award.title,
            reason: award.reason,
            given_by_user_id: teacherUser.user.id,
          })
        }

        // Create demo check-ins
        console.log("Creating demo check-ins...")
        for (let i = 0; i < 5; i++) {
          const date = new Date()
          date.setDate(date.getDate() - i)
          await supabase.from("checkins").upsert({
            child_id: childData.id,
            type: "prayer",
            date: date.toISOString().split("T")[0],
            value: true,
          })
        }
      }
    }

    console.log("✅ Seed completed successfully!")
    console.log("\nDemo Accounts:")
    console.log("  Admin: admin@thechosengeneration.org / demo-password-123")
    console.log("  Teacher: teacher@thechosengeneration.org / demo-password-123")
    console.log("  Parent: parent@example.com / demo-password-123")
    console.log("  Child PIN: 1234")

  } catch (error) {
    console.error("Seed error:", error)
    process.exit(1)
  }
}

seed()
