export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      assignments: {
        Row: {
          accepted_at: string | null
          assigned_at: string
          created_at: string
          cycle_id: string | null
          first_action_at: string | null
          id: string
          lead_id: string
          owner_id: string
          previous_owner: string | null
          priority: Database["public"]["Enums"]["lead_priority"]
          reassign_reason: string | null
          reassigned_at: string | null
          sla_deadline_accept: string
          sla_deadline_first_action: string
          state: Database["public"]["Enums"]["assignment_state"]
          updated_at: string
        }
        Insert: {
          accepted_at?: string | null
          assigned_at?: string
          created_at?: string
          cycle_id?: string | null
          first_action_at?: string | null
          id?: string
          lead_id: string
          owner_id: string
          previous_owner?: string | null
          priority: Database["public"]["Enums"]["lead_priority"]
          reassign_reason?: string | null
          reassigned_at?: string | null
          sla_deadline_accept: string
          sla_deadline_first_action: string
          state?: Database["public"]["Enums"]["assignment_state"]
          updated_at?: string
        }
        Update: {
          accepted_at?: string | null
          assigned_at?: string
          created_at?: string
          cycle_id?: string | null
          first_action_at?: string | null
          id?: string
          lead_id?: string
          owner_id?: string
          previous_owner?: string | null
          priority?: Database["public"]["Enums"]["lead_priority"]
          reassign_reason?: string | null
          reassigned_at?: string | null
          sla_deadline_accept?: string
          sla_deadline_first_action?: string
          state?: Database["public"]["Enums"]["assignment_state"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "assignments_cycle_id_fkey"
            columns: ["cycle_id"]
            isOneToOne: false
            referencedRelation: "lead_cycles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assignments_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "flow_checkin_status"
            referencedColumns: ["lead_id"]
          },
          {
            foreignKeyName: "assignments_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "flow_three_day_truth"
            referencedColumns: ["lead_id"]
          },
          {
            foreignKeyName: "assignments_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_logs: {
        Row: {
          action: string
          actor: string | null
          at: string
          entity: string
          entity_id: string | null
          id: string
          next: Json | null
          prev: Json | null
          reason: string | null
        }
        Insert: {
          action: string
          actor?: string | null
          at?: string
          entity: string
          entity_id?: string | null
          id?: string
          next?: Json | null
          prev?: Json | null
          reason?: string | null
        }
        Update: {
          action?: string
          actor?: string | null
          at?: string
          entity?: string
          entity_id?: string | null
          id?: string
          next?: Json | null
          prev?: Json | null
          reason?: string | null
        }
        Relationships: []
      }
      conversation_compilations: {
        Row: {
          action_due_at: string | null
          active_interpretation: boolean
          automation_safe: boolean
          blocker: string | null
          canonical_event: string
          compiled_at: string
          compiler_version: string
          confidence: number
          conversation_stage: string
          event_family: string
          evidence_quality: number
          extracted_entities: Json
          health: string
          id: string
          intent: string
          lead_id: string | null
          modifiers: string[]
          momentum: number
          movement: string
          needs_review: boolean
          next_action: string
          next_action_owner: string
          observation_id: string
          original_interpretation: Json | null
          parsed_labels: Json
          priority: string
          raw_labels: string[]
          reasons: string[]
          requirement_id: string | null
          rule_id: string | null
          rule_version: number | null
          screenshot_due_at: string | null
          screenshot_status: string
          sla_status: string
          waiting_on: string
        }
        Insert: {
          action_due_at?: string | null
          active_interpretation?: boolean
          automation_safe?: boolean
          blocker?: string | null
          canonical_event: string
          compiled_at?: string
          compiler_version: string
          confidence: number
          conversation_stage: string
          event_family: string
          evidence_quality: number
          extracted_entities?: Json
          health: string
          id?: string
          intent: string
          lead_id?: string | null
          modifiers?: string[]
          momentum?: number
          movement: string
          needs_review?: boolean
          next_action: string
          next_action_owner: string
          observation_id: string
          original_interpretation?: Json | null
          parsed_labels?: Json
          priority: string
          raw_labels?: string[]
          reasons?: string[]
          requirement_id?: string | null
          rule_id?: string | null
          rule_version?: number | null
          screenshot_due_at?: string | null
          screenshot_status: string
          sla_status: string
          waiting_on: string
        }
        Update: {
          action_due_at?: string | null
          active_interpretation?: boolean
          automation_safe?: boolean
          blocker?: string | null
          canonical_event?: string
          compiled_at?: string
          compiler_version?: string
          confidence?: number
          conversation_stage?: string
          event_family?: string
          evidence_quality?: number
          extracted_entities?: Json
          health?: string
          id?: string
          intent?: string
          lead_id?: string | null
          modifiers?: string[]
          momentum?: number
          movement?: string
          needs_review?: boolean
          next_action?: string
          next_action_owner?: string
          observation_id?: string
          original_interpretation?: Json | null
          parsed_labels?: Json
          priority?: string
          raw_labels?: string[]
          reasons?: string[]
          requirement_id?: string | null
          rule_id?: string | null
          rule_version?: number | null
          screenshot_due_at?: string | null
          screenshot_status?: string
          sla_status?: string
          waiting_on?: string
        }
        Relationships: [
          {
            foreignKeyName: "conversation_compilations_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "flow_checkin_status"
            referencedColumns: ["lead_id"]
          },
          {
            foreignKeyName: "conversation_compilations_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "flow_three_day_truth"
            referencedColumns: ["lead_id"]
          },
          {
            foreignKeyName: "conversation_compilations_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "conversation_compilations_observation_id_fkey"
            columns: ["observation_id"]
            isOneToOne: false
            referencedRelation: "flow_three_day_truth"
            referencedColumns: ["observation_id"]
          },
          {
            foreignKeyName: "conversation_compilations_observation_id_fkey"
            columns: ["observation_id"]
            isOneToOne: false
            referencedRelation: "screenshot_observations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "conversation_compilations_rule_id_fkey"
            columns: ["rule_id"]
            isOneToOne: false
            referencedRelation: "conversation_rules"
            referencedColumns: ["id"]
          },
        ]
      }
      conversation_pattern_clusters: {
        Row: {
          assigned_family: string | null
          avg_ocr_confidence: number | null
          confidence_band: string | null
          corpus_row_count: number
          first_seen_at: string
          id: string
          last_seen_at: string
          mapped_rule_id: string | null
          normalized_pattern: string
          notes: string | null
          occurrence_count: number
          representative_text: string
          reviewed_at: string | null
          reviewed_by: string | null
          sample_labels: string[]
          source_corpus: string
          source_screenshots: string[]
          source_zones: string[]
          status: string
          suggested_family: string | null
        }
        Insert: {
          assigned_family?: string | null
          avg_ocr_confidence?: number | null
          confidence_band?: string | null
          corpus_row_count?: number
          first_seen_at?: string
          id?: string
          last_seen_at?: string
          mapped_rule_id?: string | null
          normalized_pattern: string
          notes?: string | null
          occurrence_count?: number
          representative_text: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          sample_labels?: string[]
          source_corpus?: string
          source_screenshots?: string[]
          source_zones?: string[]
          status?: string
          suggested_family?: string | null
        }
        Update: {
          assigned_family?: string | null
          avg_ocr_confidence?: number | null
          confidence_band?: string | null
          corpus_row_count?: number
          first_seen_at?: string
          id?: string
          last_seen_at?: string
          mapped_rule_id?: string | null
          normalized_pattern?: string
          notes?: string | null
          occurrence_count?: number
          representative_text?: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          sample_labels?: string[]
          source_corpus?: string
          source_screenshots?: string[]
          source_zones?: string[]
          status?: string
          suggested_family?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "conversation_pattern_clusters_mapped_rule_id_fkey"
            columns: ["mapped_rule_id"]
            isOneToOne: false
            referencedRelation: "conversation_rules"
            referencedColumns: ["id"]
          },
        ]
      }
      conversation_rules: {
        Row: {
          active: boolean
          allowed_directions: string[]
          blocker: string | null
          canonical_event: string
          confidence_threshold: number
          created_at: string
          created_by: string | null
          default_next_action: string
          default_owner_role: string
          entity_extractors: string[]
          event_family: string
          failure_transitions: string[]
          forbidden_previous_events: string[]
          human_review_below: number
          id: string
          modifiers_to_add: string[]
          movement_effect: number
          negative_patterns: Json
          observed_count: number
          positive_patterns: Json
          priority: string
          required_previous_events: string[]
          rule_key: string
          semantic_examples: Json
          sla_minutes: number | null
          source: string
          stage_after: string
          success_transitions: string[]
          updated_at: string
          version: number
          waiting_on: string
        }
        Insert: {
          active?: boolean
          allowed_directions?: string[]
          blocker?: string | null
          canonical_event: string
          confidence_threshold?: number
          created_at?: string
          created_by?: string | null
          default_next_action: string
          default_owner_role: string
          entity_extractors?: string[]
          event_family: string
          failure_transitions?: string[]
          forbidden_previous_events?: string[]
          human_review_below?: number
          id?: string
          modifiers_to_add?: string[]
          movement_effect?: number
          negative_patterns?: Json
          observed_count?: number
          positive_patterns?: Json
          priority?: string
          required_previous_events?: string[]
          rule_key: string
          semantic_examples?: Json
          sla_minutes?: number | null
          source?: string
          stage_after: string
          success_transitions?: string[]
          updated_at?: string
          version?: number
          waiting_on: string
        }
        Update: {
          active?: boolean
          allowed_directions?: string[]
          blocker?: string | null
          canonical_event?: string
          confidence_threshold?: number
          created_at?: string
          created_by?: string | null
          default_next_action?: string
          default_owner_role?: string
          entity_extractors?: string[]
          event_family?: string
          failure_transitions?: string[]
          forbidden_previous_events?: string[]
          human_review_below?: number
          id?: string
          modifiers_to_add?: string[]
          movement_effect?: number
          negative_patterns?: Json
          observed_count?: number
          positive_patterns?: Json
          priority?: string
          required_previous_events?: string[]
          rule_key?: string
          semantic_examples?: Json
          sla_minutes?: number | null
          source?: string
          stage_after?: string
          success_transitions?: string[]
          updated_at?: string
          version?: number
          waiting_on?: string
        }
        Relationships: []
      }
      conversation_states: {
        Row: {
          action_due_at: string | null
          automation_safe: boolean
          blocker: string | null
          canonical_event: string
          confidence: number
          conversation_stage: string
          event_family: string
          evidence_quality: number
          extracted_entities: Json
          health: string
          intent: string
          last_screenshot_at: string | null
          latest_compilation_id: string | null
          latest_observation_id: string | null
          lead_id: string
          modifiers: string[]
          momentum: number
          movement: string
          needs_review: boolean
          next_action: string
          next_action_owner: string
          priority: string
          requirement_id: string | null
          screenshot_due_at: string | null
          screenshot_status: string
          sla_status: string
          updated_at: string
          waiting_on: string
        }
        Insert: {
          action_due_at?: string | null
          automation_safe?: boolean
          blocker?: string | null
          canonical_event: string
          confidence: number
          conversation_stage: string
          event_family: string
          evidence_quality: number
          extracted_entities?: Json
          health: string
          intent: string
          last_screenshot_at?: string | null
          latest_compilation_id?: string | null
          latest_observation_id?: string | null
          lead_id: string
          modifiers?: string[]
          momentum?: number
          movement: string
          needs_review?: boolean
          next_action: string
          next_action_owner: string
          priority: string
          requirement_id?: string | null
          screenshot_due_at?: string | null
          screenshot_status: string
          sla_status: string
          updated_at?: string
          waiting_on: string
        }
        Update: {
          action_due_at?: string | null
          automation_safe?: boolean
          blocker?: string | null
          canonical_event?: string
          confidence?: number
          conversation_stage?: string
          event_family?: string
          evidence_quality?: number
          extracted_entities?: Json
          health?: string
          intent?: string
          last_screenshot_at?: string | null
          latest_compilation_id?: string | null
          latest_observation_id?: string | null
          lead_id?: string
          modifiers?: string[]
          momentum?: number
          movement?: string
          needs_review?: boolean
          next_action?: string
          next_action_owner?: string
          priority?: string
          requirement_id?: string | null
          screenshot_due_at?: string | null
          screenshot_status?: string
          sla_status?: string
          updated_at?: string
          waiting_on?: string
        }
        Relationships: [
          {
            foreignKeyName: "conversation_states_latest_compilation_id_fkey"
            columns: ["latest_compilation_id"]
            isOneToOne: false
            referencedRelation: "conversation_compilations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "conversation_states_latest_observation_id_fkey"
            columns: ["latest_observation_id"]
            isOneToOne: false
            referencedRelation: "flow_three_day_truth"
            referencedColumns: ["observation_id"]
          },
          {
            foreignKeyName: "conversation_states_latest_observation_id_fkey"
            columns: ["latest_observation_id"]
            isOneToOne: false
            referencedRelation: "screenshot_observations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "conversation_states_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: true
            referencedRelation: "flow_checkin_status"
            referencedColumns: ["lead_id"]
          },
          {
            foreignKeyName: "conversation_states_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: true
            referencedRelation: "flow_three_day_truth"
            referencedColumns: ["lead_id"]
          },
          {
            foreignKeyName: "conversation_states_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: true
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
        ]
      }
      conversation_transitions: {
        Row: {
          blocker: string | null
          from_compilation_id: string | null
          from_event: string | null
          id: string
          lead_id: string
          momentum_delta: number
          movement: string
          occurred_at: string
          to_compilation_id: string
          to_event: string
        }
        Insert: {
          blocker?: string | null
          from_compilation_id?: string | null
          from_event?: string | null
          id?: string
          lead_id: string
          momentum_delta?: number
          movement: string
          occurred_at?: string
          to_compilation_id: string
          to_event: string
        }
        Update: {
          blocker?: string | null
          from_compilation_id?: string | null
          from_event?: string | null
          id?: string
          lead_id?: string
          momentum_delta?: number
          movement?: string
          occurred_at?: string
          to_compilation_id?: string
          to_event?: string
        }
        Relationships: [
          {
            foreignKeyName: "conversation_transitions_from_compilation_id_fkey"
            columns: ["from_compilation_id"]
            isOneToOne: false
            referencedRelation: "conversation_compilations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "conversation_transitions_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "flow_checkin_status"
            referencedColumns: ["lead_id"]
          },
          {
            foreignKeyName: "conversation_transitions_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "flow_three_day_truth"
            referencedColumns: ["lead_id"]
          },
          {
            foreignKeyName: "conversation_transitions_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "conversation_transitions_to_compilation_id_fkey"
            columns: ["to_compilation_id"]
            isOneToOne: true
            referencedRelation: "conversation_compilations"
            referencedColumns: ["id"]
          },
        ]
      }
      crib_bookings: {
        Row: {
          agreement_duration: number
          agreement_start_date: string
          country_code: string
          created_at: string
          created_by: string | null
          due_type: string
          due_value: string
          id: string
          lock_in_period: number
          maintenance_amount: number
          monthly_rent: number
          notes: string | null
          notice_period: number
          property_id: string
          property_name: string | null
          rent_cycle: string
          room_type_id: string
          security_deposit: number
          status: string
          tenant_name: string
          tenant_phone: string
          token: string
          updated_at: string
        }
        Insert: {
          agreement_duration?: number
          agreement_start_date: string
          country_code?: string
          created_at?: string
          created_by?: string | null
          due_type?: string
          due_value?: string
          id?: string
          lock_in_period?: number
          maintenance_amount?: number
          monthly_rent?: number
          notes?: string | null
          notice_period?: number
          property_id: string
          property_name?: string | null
          rent_cycle?: string
          room_type_id: string
          security_deposit?: number
          status?: string
          tenant_name: string
          tenant_phone: string
          token?: string
          updated_at?: string
        }
        Update: {
          agreement_duration?: number
          agreement_start_date?: string
          country_code?: string
          created_at?: string
          created_by?: string | null
          due_type?: string
          due_value?: string
          id?: string
          lock_in_period?: number
          maintenance_amount?: number
          monthly_rent?: number
          notes?: string | null
          notice_period?: number
          property_id?: string
          property_name?: string | null
          rent_cycle?: string
          room_type_id?: string
          security_deposit?: number
          status?: string
          tenant_name?: string
          tenant_phone?: string
          token?: string
          updated_at?: string
        }
        Relationships: []
      }
      daily_quality_reports: {
        Row: {
          created_at: string
          day: string
          generated_by: string | null
          id: string
          metrics: Json
          notes: string | null
        }
        Insert: {
          created_at?: string
          day: string
          generated_by?: string | null
          id?: string
          metrics?: Json
          notes?: string | null
        }
        Update: {
          created_at?: string
          day?: string
          generated_by?: string | null
          id?: string
          metrics?: Json
          notes?: string | null
        }
        Relationships: []
      }
      draft_batch_items: {
        Row: {
          added_at: string
          batch_id: string
          completed_at: string | null
          id: string
          lead_id: string
          mission: string | null
          rank: number
          released_at: string | null
          score: number
          status: string
          why_now: string | null
          work_claim_id: string | null
        }
        Insert: {
          added_at?: string
          batch_id: string
          completed_at?: string | null
          id?: string
          lead_id: string
          mission?: string | null
          rank: number
          released_at?: string | null
          score?: number
          status?: string
          why_now?: string | null
          work_claim_id?: string | null
        }
        Update: {
          added_at?: string
          batch_id?: string
          completed_at?: string | null
          id?: string
          lead_id?: string
          mission?: string | null
          rank?: number
          released_at?: string | null
          score?: number
          status?: string
          why_now?: string | null
          work_claim_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "draft_batch_items_batch_id_fkey"
            columns: ["batch_id"]
            isOneToOne: false
            referencedRelation: "draft_batches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "draft_batch_items_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "flow_checkin_status"
            referencedColumns: ["lead_id"]
          },
          {
            foreignKeyName: "draft_batch_items_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "flow_three_day_truth"
            referencedColumns: ["lead_id"]
          },
          {
            foreignKeyName: "draft_batch_items_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "draft_batch_items_work_claim_id_fkey"
            columns: ["work_claim_id"]
            isOneToOne: false
            referencedRelation: "flow_three_day_truth"
            referencedColumns: ["claim_id"]
          },
          {
            foreignKeyName: "draft_batch_items_work_claim_id_fkey"
            columns: ["work_claim_id"]
            isOneToOne: false
            referencedRelation: "work_claims"
            referencedColumns: ["id"]
          },
        ]
      }
      draft_batches: {
        Row: {
          completed_at: string | null
          created_at: string
          id: string
          metadata: Json
          operator_id: string
          status: string
          target_size: number
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          id?: string
          metadata?: Json
          operator_id: string
          status?: string
          target_size?: number
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          id?: string
          metadata?: Json
          operator_id?: string
          status?: string
          target_size?: number
        }
        Relationships: []
      }
      duplicate_matches: {
        Row: {
          created_at: string
          existing_lead_id: string | null
          id: string
          new_conversation_id: string | null
          phone: string
          resolution: string | null
          resolved_at: string | null
          resolved_by: string | null
        }
        Insert: {
          created_at?: string
          existing_lead_id?: string | null
          id?: string
          new_conversation_id?: string | null
          phone: string
          resolution?: string | null
          resolved_at?: string | null
          resolved_by?: string | null
        }
        Update: {
          created_at?: string
          existing_lead_id?: string | null
          id?: string
          new_conversation_id?: string | null
          phone?: string
          resolution?: string | null
          resolved_at?: string | null
          resolved_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "duplicate_matches_existing_lead_id_fkey"
            columns: ["existing_lead_id"]
            isOneToOne: false
            referencedRelation: "flow_checkin_status"
            referencedColumns: ["lead_id"]
          },
          {
            foreignKeyName: "duplicate_matches_existing_lead_id_fkey"
            columns: ["existing_lead_id"]
            isOneToOne: false
            referencedRelation: "flow_three_day_truth"
            referencedColumns: ["lead_id"]
          },
          {
            foreignKeyName: "duplicate_matches_existing_lead_id_fkey"
            columns: ["existing_lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "duplicate_matches_new_conversation_id_fkey"
            columns: ["new_conversation_id"]
            isOneToOne: false
            referencedRelation: "inbound_conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      eod_reports: {
        Row: {
          checklist: Json
          closed: boolean
          closed_at: string | null
          closed_by: string | null
          created_at: string
          day: string
          id: string
          totals: Json
        }
        Insert: {
          checklist?: Json
          closed?: boolean
          closed_at?: string | null
          closed_by?: string | null
          created_at?: string
          day: string
          id?: string
          totals?: Json
        }
        Update: {
          checklist?: Json
          closed?: boolean
          closed_at?: string | null
          closed_by?: string | null
          created_at?: string
          day?: string
          id?: string
          totals?: Json
        }
        Relationships: []
      }
      flow_checkin_readiness: {
        Row: {
          agreement_done: boolean
          arrived_at: string | null
          bed_reference: string | null
          booking_id: string | null
          confirmed_at: string | null
          confirmed_by: string | null
          created_at: string
          keys_handed_over_at: string | null
          kyc_done: boolean
          lead_id: string
          notes: string | null
          owner_approval_status: string
          payment_ref: string | null
          payment_verified: boolean
          room_number: string | null
          updated_at: string
        }
        Insert: {
          agreement_done?: boolean
          arrived_at?: string | null
          bed_reference?: string | null
          booking_id?: string | null
          confirmed_at?: string | null
          confirmed_by?: string | null
          created_at?: string
          keys_handed_over_at?: string | null
          kyc_done?: boolean
          lead_id: string
          notes?: string | null
          owner_approval_status?: string
          payment_ref?: string | null
          payment_verified?: boolean
          room_number?: string | null
          updated_at?: string
        }
        Update: {
          agreement_done?: boolean
          arrived_at?: string | null
          bed_reference?: string | null
          booking_id?: string | null
          confirmed_at?: string | null
          confirmed_by?: string | null
          created_at?: string
          keys_handed_over_at?: string | null
          kyc_done?: boolean
          lead_id?: string
          notes?: string | null
          owner_approval_status?: string
          payment_ref?: string | null
          payment_verified?: boolean
          room_number?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "flow_checkin_readiness_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: true
            referencedRelation: "flow_checkin_status"
            referencedColumns: ["lead_id"]
          },
          {
            foreignKeyName: "flow_checkin_readiness_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: true
            referencedRelation: "flow_three_day_truth"
            referencedColumns: ["lead_id"]
          },
          {
            foreignKeyName: "flow_checkin_readiness_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: true
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
        ]
      }
      flow_draft_batches: {
        Row: {
          active_tray_size: number
          closed_at: string | null
          created_at: string
          id: string
          operator_id: string
          operator_name: string | null
          status: string
          target_size: number
        }
        Insert: {
          active_tray_size?: number
          closed_at?: string | null
          created_at?: string
          id?: string
          operator_id: string
          operator_name?: string | null
          status?: string
          target_size?: number
        }
        Update: {
          active_tray_size?: number
          closed_at?: string | null
          created_at?: string
          id?: string
          operator_id?: string
          operator_name?: string | null
          status?: string
          target_size?: number
        }
        Relationships: []
      }
      flow_draft_items: {
        Row: {
          batch_id: string
          completed_at: string | null
          created_at: string
          disposition: string | null
          id: string
          is_priority_interrupt: boolean
          lead_id: string
          position: number
          roi_reasons: string[]
          roi_score: number
          state: string
        }
        Insert: {
          batch_id: string
          completed_at?: string | null
          created_at?: string
          disposition?: string | null
          id?: string
          is_priority_interrupt?: boolean
          lead_id: string
          position: number
          roi_reasons?: string[]
          roi_score?: number
          state?: string
        }
        Update: {
          batch_id?: string
          completed_at?: string | null
          created_at?: string
          disposition?: string | null
          id?: string
          is_priority_interrupt?: boolean
          lead_id?: string
          position?: number
          roi_reasons?: string[]
          roi_score?: number
          state?: string
        }
        Relationships: [
          {
            foreignKeyName: "flow_draft_items_batch_id_fkey"
            columns: ["batch_id"]
            isOneToOne: false
            referencedRelation: "flow_draft_batches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "flow_draft_items_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "flow_checkin_status"
            referencedColumns: ["lead_id"]
          },
          {
            foreignKeyName: "flow_draft_items_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "flow_three_day_truth"
            referencedColumns: ["lead_id"]
          },
          {
            foreignKeyName: "flow_draft_items_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
        ]
      }
      flow_label_colour_mapping: {
        Row: {
          active: boolean
          colour_key: string
          created_at: string
          crm_label: string
          id: string
          suggested_mission: string | null
          suggested_stage: string | null
          updated_at: string
          updated_by: string | null
          wa_label_name: string | null
        }
        Insert: {
          active?: boolean
          colour_key: string
          created_at?: string
          crm_label: string
          id?: string
          suggested_mission?: string | null
          suggested_stage?: string | null
          updated_at?: string
          updated_by?: string | null
          wa_label_name?: string | null
        }
        Update: {
          active?: boolean
          colour_key?: string
          created_at?: string
          crm_label?: string
          id?: string
          suggested_mission?: string | null
          suggested_stage?: string | null
          updated_at?: string
          updated_by?: string | null
          wa_label_name?: string | null
        }
        Relationships: []
      }
      flow_label_rules: {
        Row: {
          color_hint: string | null
          created_at: string
          created_by: string | null
          id: string
          inferred_bucket: string | null
          inferred_label: string
          inferred_priority: string | null
          is_enabled: boolean
          name: string
          rank: number
          seen_state: string | null
          source_id: string | null
          text_pattern: string | null
          updated_at: string
          whatsapp_account: string | null
        }
        Insert: {
          color_hint?: string | null
          created_at?: string
          created_by?: string | null
          id?: string
          inferred_bucket?: string | null
          inferred_label: string
          inferred_priority?: string | null
          is_enabled?: boolean
          name: string
          rank?: number
          seen_state?: string | null
          source_id?: string | null
          text_pattern?: string | null
          updated_at?: string
          whatsapp_account?: string | null
        }
        Update: {
          color_hint?: string | null
          created_at?: string
          created_by?: string | null
          id?: string
          inferred_bucket?: string | null
          inferred_label?: string
          inferred_priority?: string | null
          is_enabled?: boolean
          name?: string
          rank?: number
          seen_state?: string | null
          source_id?: string | null
          text_pattern?: string | null
          updated_at?: string
          whatsapp_account?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "flow_label_rules_source_id_fkey"
            columns: ["source_id"]
            isOneToOne: false
            referencedRelation: "whatsapp_sources"
            referencedColumns: ["id"]
          },
        ]
      }
      flow_screenshot_batches: {
        Row: {
          capture_from: string | null
          capture_to: string | null
          created_at: string
          id: string
          note: string | null
          rows_reconciled: number
          rows_segmented: number
          screenshot_count: number
          status: string
          unresolved_rows: number
          updated_at: string
          uploaded_by: string | null
          uploaded_by_name: string | null
          visible_rows_expected: number
          wa_account_label: string | null
          wa_source_id: string | null
        }
        Insert: {
          capture_from?: string | null
          capture_to?: string | null
          created_at?: string
          id?: string
          note?: string | null
          rows_reconciled?: number
          rows_segmented?: number
          screenshot_count?: number
          status?: string
          unresolved_rows?: number
          updated_at?: string
          uploaded_by?: string | null
          uploaded_by_name?: string | null
          visible_rows_expected?: number
          wa_account_label?: string | null
          wa_source_id?: string | null
        }
        Update: {
          capture_from?: string | null
          capture_to?: string | null
          created_at?: string
          id?: string
          note?: string | null
          rows_reconciled?: number
          rows_segmented?: number
          screenshot_count?: number
          status?: string
          unresolved_rows?: number
          updated_at?: string
          uploaded_by?: string | null
          uploaded_by_name?: string | null
          visible_rows_expected?: number
          wa_account_label?: string | null
          wa_source_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "flow_screenshot_batches_wa_source_id_fkey"
            columns: ["wa_source_id"]
            isOneToOne: false
            referencedRelation: "whatsapp_sources"
            referencedColumns: ["id"]
          },
        ]
      }
      flow_screenshot_observations: {
        Row: {
          batch_id: string
          captured_at: string
          contact_name: string | null
          created_at: string
          handler_id: string | null
          handler_name: string | null
          id: string
          label_colour: string | null
          label_name: string | null
          last_message: string | null
          lead_id: string | null
          movement_signal: string | null
          ocr_confidence: number | null
          phone_e164: string | null
          phone_raw: string | null
          preview_direction: string | null
          previous_observation_id: string | null
          raw_text: string | null
          resolution: string
          resolution_reason: string | null
          resolved_at: string | null
          row_bottom_px: number | null
          row_colour: string | null
          row_index: number
          row_top_px: number | null
          screenshot_hash: string | null
          screenshot_key: string
          seen_state: string
          suggested_mission: string | null
          suggested_stage: string | null
          suggestion_confidence: number | null
          suggestion_evidence: string | null
          unread_count: number
          visible_timestamp_raw: string | null
          wa_account_label: string | null
          wa_source_id: string | null
        }
        Insert: {
          batch_id: string
          captured_at?: string
          contact_name?: string | null
          created_at?: string
          handler_id?: string | null
          handler_name?: string | null
          id?: string
          label_colour?: string | null
          label_name?: string | null
          last_message?: string | null
          lead_id?: string | null
          movement_signal?: string | null
          ocr_confidence?: number | null
          phone_e164?: string | null
          phone_raw?: string | null
          preview_direction?: string | null
          previous_observation_id?: string | null
          raw_text?: string | null
          resolution?: string
          resolution_reason?: string | null
          resolved_at?: string | null
          row_bottom_px?: number | null
          row_colour?: string | null
          row_index: number
          row_top_px?: number | null
          screenshot_hash?: string | null
          screenshot_key: string
          seen_state?: string
          suggested_mission?: string | null
          suggested_stage?: string | null
          suggestion_confidence?: number | null
          suggestion_evidence?: string | null
          unread_count?: number
          visible_timestamp_raw?: string | null
          wa_account_label?: string | null
          wa_source_id?: string | null
        }
        Update: {
          batch_id?: string
          captured_at?: string
          contact_name?: string | null
          created_at?: string
          handler_id?: string | null
          handler_name?: string | null
          id?: string
          label_colour?: string | null
          label_name?: string | null
          last_message?: string | null
          lead_id?: string | null
          movement_signal?: string | null
          ocr_confidence?: number | null
          phone_e164?: string | null
          phone_raw?: string | null
          preview_direction?: string | null
          previous_observation_id?: string | null
          raw_text?: string | null
          resolution?: string
          resolution_reason?: string | null
          resolved_at?: string | null
          row_bottom_px?: number | null
          row_colour?: string | null
          row_index?: number
          row_top_px?: number | null
          screenshot_hash?: string | null
          screenshot_key?: string
          seen_state?: string
          suggested_mission?: string | null
          suggested_stage?: string | null
          suggestion_confidence?: number | null
          suggestion_evidence?: string | null
          unread_count?: number
          visible_timestamp_raw?: string | null
          wa_account_label?: string | null
          wa_source_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "flow_screenshot_observations_batch_id_fkey"
            columns: ["batch_id"]
            isOneToOne: false
            referencedRelation: "flow_screenshot_batches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "flow_screenshot_observations_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "flow_checkin_status"
            referencedColumns: ["lead_id"]
          },
          {
            foreignKeyName: "flow_screenshot_observations_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "flow_three_day_truth"
            referencedColumns: ["lead_id"]
          },
          {
            foreignKeyName: "flow_screenshot_observations_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "flow_screenshot_observations_previous_observation_id_fkey"
            columns: ["previous_observation_id"]
            isOneToOne: false
            referencedRelation: "flow_screenshot_observations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "flow_screenshot_observations_wa_source_id_fkey"
            columns: ["wa_source_id"]
            isOneToOne: false
            referencedRelation: "whatsapp_sources"
            referencedColumns: ["id"]
          },
        ]
      }
      flow_work_claims: {
        Row: {
          claimed_at: string
          created_at: string
          draft_batch_id: string | null
          expires_at: string
          id: string
          last_meaningful_activity_at: string
          lead_id: string
          operator_id: string
          operator_name: string | null
          release_reason: string | null
          released_at: string | null
          state: string
          takeover_requested_at: string | null
          takeover_requested_by: string | null
          takeover_requested_by_name: string | null
        }
        Insert: {
          claimed_at?: string
          created_at?: string
          draft_batch_id?: string | null
          expires_at?: string
          id?: string
          last_meaningful_activity_at?: string
          lead_id: string
          operator_id: string
          operator_name?: string | null
          release_reason?: string | null
          released_at?: string | null
          state?: string
          takeover_requested_at?: string | null
          takeover_requested_by?: string | null
          takeover_requested_by_name?: string | null
        }
        Update: {
          claimed_at?: string
          created_at?: string
          draft_batch_id?: string | null
          expires_at?: string
          id?: string
          last_meaningful_activity_at?: string
          lead_id?: string
          operator_id?: string
          operator_name?: string | null
          release_reason?: string | null
          released_at?: string | null
          state?: string
          takeover_requested_at?: string | null
          takeover_requested_by?: string | null
          takeover_requested_by_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "flow_work_claims_draft_batch_id_fkey"
            columns: ["draft_batch_id"]
            isOneToOne: false
            referencedRelation: "flow_draft_batches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "flow_work_claims_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "flow_checkin_status"
            referencedColumns: ["lead_id"]
          },
          {
            foreignKeyName: "flow_work_claims_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "flow_three_day_truth"
            referencedColumns: ["lead_id"]
          },
          {
            foreignKeyName: "flow_work_claims_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
        ]
      }
      hourly_reports: {
        Row: {
          accepted: number
          assigned: number
          captured: number
          created_at: string
          duplicates: number
          first_actioned: number
          hour_start: string
          id: string
          owners_at_capacity: number
          pending_capture: number
          reassignments: number
          received: number
          sla_breaches: number
          super_hot_pending: number
          unclear_date: number
          unclear_location: number
        }
        Insert: {
          accepted?: number
          assigned?: number
          captured?: number
          created_at?: string
          duplicates?: number
          first_actioned?: number
          hour_start: string
          id?: string
          owners_at_capacity?: number
          pending_capture?: number
          reassignments?: number
          received?: number
          sla_breaches?: number
          super_hot_pending?: number
          unclear_date?: number
          unclear_location?: number
        }
        Update: {
          accepted?: number
          assigned?: number
          captured?: number
          created_at?: string
          duplicates?: number
          first_actioned?: number
          hour_start?: string
          id?: string
          owners_at_capacity?: number
          pending_capture?: number
          reassignments?: number
          received?: number
          sla_breaches?: number
          super_hot_pending?: number
          unclear_date?: number
          unclear_location?: number
        }
        Relationships: []
      }
      inbound_conversations: {
        Row: {
          captured_at: string | null
          captured_by: string | null
          conversation_link: string | null
          created_at: string
          cycle_id: string | null
          first_message: string | null
          id: string
          latest_message: string | null
          lead_id: string | null
          phone: string
          received_at: string
          source_id: string | null
          wa_name: string | null
        }
        Insert: {
          captured_at?: string | null
          captured_by?: string | null
          conversation_link?: string | null
          created_at?: string
          cycle_id?: string | null
          first_message?: string | null
          id?: string
          latest_message?: string | null
          lead_id?: string | null
          phone: string
          received_at?: string
          source_id?: string | null
          wa_name?: string | null
        }
        Update: {
          captured_at?: string | null
          captured_by?: string | null
          conversation_link?: string | null
          created_at?: string
          cycle_id?: string | null
          first_message?: string | null
          id?: string
          latest_message?: string | null
          lead_id?: string | null
          phone?: string
          received_at?: string
          source_id?: string | null
          wa_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "inbound_conversations_cycle_id_fkey"
            columns: ["cycle_id"]
            isOneToOne: false
            referencedRelation: "lead_cycles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "inbound_conversations_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "flow_checkin_status"
            referencedColumns: ["lead_id"]
          },
          {
            foreignKeyName: "inbound_conversations_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "flow_three_day_truth"
            referencedColumns: ["lead_id"]
          },
          {
            foreignKeyName: "inbound_conversations_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "inbound_conversations_source_id_fkey"
            columns: ["source_id"]
            isOneToOne: false
            referencedRelation: "whatsapp_sources"
            referencedColumns: ["id"]
          },
        ]
      }
      lead_cycles: {
        Row: {
          close_reason: string | null
          closed_at: string | null
          cycle_no: number
          id: string
          lead_id: string
          open_reason: string | null
          opened_at: string
        }
        Insert: {
          close_reason?: string | null
          closed_at?: string | null
          cycle_no: number
          id?: string
          lead_id: string
          open_reason?: string | null
          opened_at?: string
        }
        Update: {
          close_reason?: string | null
          closed_at?: string | null
          cycle_no?: number
          id?: string
          lead_id?: string
          open_reason?: string | null
          opened_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "lead_cycles_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "flow_checkin_status"
            referencedColumns: ["lead_id"]
          },
          {
            foreignKeyName: "lead_cycles_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "flow_three_day_truth"
            referencedColumns: ["lead_id"]
          },
          {
            foreignKeyName: "lead_cycles_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
        ]
      }
      lead_scenarios_log: {
        Row: {
          assignment_id: string | null
          created_at: string
          created_by: string | null
          id: string
          lead_id: string
          notes: string | null
          scenario: Database["public"]["Enums"]["scenario_code"]
        }
        Insert: {
          assignment_id?: string | null
          created_at?: string
          created_by?: string | null
          id?: string
          lead_id: string
          notes?: string | null
          scenario: Database["public"]["Enums"]["scenario_code"]
        }
        Update: {
          assignment_id?: string | null
          created_at?: string
          created_by?: string | null
          id?: string
          lead_id?: string
          notes?: string | null
          scenario?: Database["public"]["Enums"]["scenario_code"]
        }
        Relationships: [
          {
            foreignKeyName: "lead_scenarios_log_assignment_id_fkey"
            columns: ["assignment_id"]
            isOneToOne: false
            referencedRelation: "assignments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lead_scenarios_log_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "flow_checkin_status"
            referencedColumns: ["lead_id"]
          },
          {
            foreignKeyName: "lead_scenarios_log_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "flow_three_day_truth"
            referencedColumns: ["lead_id"]
          },
          {
            foreignKeyName: "lead_scenarios_log_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
        ]
      }
      lead_timeline: {
        Row: {
          activity: string
          actor: string | null
          at: string
          created_at: string
          customer_outcome: string | null
          deadline: string | null
          detail: string | null
          feedback_status: Database["public"]["Enums"]["feedback_status"] | null
          id: string
          lead_id: string | null
          new_owner: string | null
          new_stage: string | null
          next_action: string | null
          prev_owner: string | null
          prev_stage: string | null
          review_id: string | null
          score: number | null
          team: Database["public"]["Enums"]["review_team"] | null
        }
        Insert: {
          activity: string
          actor?: string | null
          at?: string
          created_at?: string
          customer_outcome?: string | null
          deadline?: string | null
          detail?: string | null
          feedback_status?:
            | Database["public"]["Enums"]["feedback_status"]
            | null
          id?: string
          lead_id?: string | null
          new_owner?: string | null
          new_stage?: string | null
          next_action?: string | null
          prev_owner?: string | null
          prev_stage?: string | null
          review_id?: string | null
          score?: number | null
          team?: Database["public"]["Enums"]["review_team"] | null
        }
        Update: {
          activity?: string
          actor?: string | null
          at?: string
          created_at?: string
          customer_outcome?: string | null
          deadline?: string | null
          detail?: string | null
          feedback_status?:
            | Database["public"]["Enums"]["feedback_status"]
            | null
          id?: string
          lead_id?: string | null
          new_owner?: string | null
          new_stage?: string | null
          next_action?: string | null
          prev_owner?: string | null
          prev_stage?: string | null
          review_id?: string | null
          score?: number | null
          team?: Database["public"]["Enums"]["review_team"] | null
        }
        Relationships: [
          {
            foreignKeyName: "lead_timeline_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "flow_checkin_status"
            referencedColumns: ["lead_id"]
          },
          {
            foreignKeyName: "lead_timeline_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "flow_three_day_truth"
            referencedColumns: ["lead_id"]
          },
          {
            foreignKeyName: "lead_timeline_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lead_timeline_review_id_fkey"
            columns: ["review_id"]
            isOneToOne: false
            referencedRelation: "reviews"
            referencedColumns: ["id"]
          },
        ]
      }
      leads: {
        Row: {
          created_at: string
          current_handler_id: string | null
          current_handler_name: string | null
          current_mission: string
          current_owner: string | null
          current_pipeline_stage: string
          current_scenario: Database["public"]["Enums"]["scenario_code"] | null
          id: string
          inferred_label: string | null
          inferred_stage: string | null
          last_operator_action_at: string | null
          last_wa_message: string | null
          last_wa_seen_at: string | null
          latest_whatsapp_observation_at: string | null
          latest_whatsapp_preview: string | null
          location_score: number
          location_text: string | null
          movein_bucket: Database["public"]["Enums"]["move_in_bucket"] | null
          movein_date: string | null
          movein_score: number
          opportunity_score: number
          phone: string
          pipeline_stage: string
          primary_blocker: string | null
          priority: Database["public"]["Enums"]["lead_priority"] | null
          score: number
          status: string
          suggested_mission: string | null
          suggested_stage: string | null
          suggestion_confidence: number | null
          suggestion_evidence: string | null
          sync_state: string | null
          updated_at: string
          wa_label_colour: string | null
          wa_label_name: string | null
          wa_name: string | null
          wa_seen_state: string | null
          wa_unread_count: number | null
          whatsapp_seen_state: string | null
          whatsapp_sync_state: string | null
          zone_id: string | null
        }
        Insert: {
          created_at?: string
          current_handler_id?: string | null
          current_handler_name?: string | null
          current_mission?: string
          current_owner?: string | null
          current_pipeline_stage?: string
          current_scenario?: Database["public"]["Enums"]["scenario_code"] | null
          id?: string
          inferred_label?: string | null
          inferred_stage?: string | null
          last_operator_action_at?: string | null
          last_wa_message?: string | null
          last_wa_seen_at?: string | null
          latest_whatsapp_observation_at?: string | null
          latest_whatsapp_preview?: string | null
          location_score?: number
          location_text?: string | null
          movein_bucket?: Database["public"]["Enums"]["move_in_bucket"] | null
          movein_date?: string | null
          movein_score?: number
          opportunity_score?: number
          phone: string
          pipeline_stage?: string
          primary_blocker?: string | null
          priority?: Database["public"]["Enums"]["lead_priority"] | null
          score?: number
          status?: string
          suggested_mission?: string | null
          suggested_stage?: string | null
          suggestion_confidence?: number | null
          suggestion_evidence?: string | null
          sync_state?: string | null
          updated_at?: string
          wa_label_colour?: string | null
          wa_label_name?: string | null
          wa_name?: string | null
          wa_seen_state?: string | null
          wa_unread_count?: number | null
          whatsapp_seen_state?: string | null
          whatsapp_sync_state?: string | null
          zone_id?: string | null
        }
        Update: {
          created_at?: string
          current_handler_id?: string | null
          current_handler_name?: string | null
          current_mission?: string
          current_owner?: string | null
          current_pipeline_stage?: string
          current_scenario?: Database["public"]["Enums"]["scenario_code"] | null
          id?: string
          inferred_label?: string | null
          inferred_stage?: string | null
          last_operator_action_at?: string | null
          last_wa_message?: string | null
          last_wa_seen_at?: string | null
          latest_whatsapp_observation_at?: string | null
          latest_whatsapp_preview?: string | null
          location_score?: number
          location_text?: string | null
          movein_bucket?: Database["public"]["Enums"]["move_in_bucket"] | null
          movein_date?: string | null
          movein_score?: number
          opportunity_score?: number
          phone?: string
          pipeline_stage?: string
          primary_blocker?: string | null
          priority?: Database["public"]["Enums"]["lead_priority"] | null
          score?: number
          status?: string
          suggested_mission?: string | null
          suggested_stage?: string | null
          suggestion_confidence?: number | null
          suggestion_evidence?: string | null
          sync_state?: string | null
          updated_at?: string
          wa_label_colour?: string | null
          wa_label_name?: string | null
          wa_name?: string | null
          wa_seen_state?: string | null
          wa_unread_count?: number | null
          whatsapp_seen_state?: string | null
          whatsapp_sync_state?: string | null
          zone_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "leads_zone_id_fkey"
            columns: ["zone_id"]
            isOneToOne: false
            referencedRelation: "zones"
            referencedColumns: ["id"]
          },
        ]
      }
      next_actions: {
        Row: {
          created_at: string
          created_by: string | null
          done_at: string | null
          due_at: string
          id: string
          kind: string
          lead_id: string
          notes: string | null
          owner_id: string | null
          priority: string | null
          source: string | null
          status: string
          triggered_by_observation_id: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          done_at?: string | null
          due_at: string
          id?: string
          kind: string
          lead_id: string
          notes?: string | null
          owner_id?: string | null
          priority?: string | null
          source?: string | null
          status?: string
          triggered_by_observation_id?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          done_at?: string | null
          due_at?: string
          id?: string
          kind?: string
          lead_id?: string
          notes?: string | null
          owner_id?: string | null
          priority?: string | null
          source?: string | null
          status?: string
          triggered_by_observation_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "next_actions_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "flow_checkin_status"
            referencedColumns: ["lead_id"]
          },
          {
            foreignKeyName: "next_actions_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "flow_three_day_truth"
            referencedColumns: ["lead_id"]
          },
          {
            foreignKeyName: "next_actions_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "next_actions_triggered_by_observation_id_fkey"
            columns: ["triggered_by_observation_id"]
            isOneToOne: false
            referencedRelation: "flow_three_day_truth"
            referencedColumns: ["observation_id"]
          },
          {
            foreignKeyName: "next_actions_triggered_by_observation_id_fkey"
            columns: ["triggered_by_observation_id"]
            isOneToOne: false
            referencedRelation: "screenshot_observations"
            referencedColumns: ["id"]
          },
        ]
      }
      performance_scores: {
        Row: {
          attendance: number
          category: Database["public"]["Enums"]["perf_category"]
          computed_at: string
          conv_rate: number
          crm_discipline: number
          followup_rate: number
          id: string
          sla_rate: number
          tour_conv: number
          user_id: string
          window_days: number
        }
        Insert: {
          attendance?: number
          category?: Database["public"]["Enums"]["perf_category"]
          computed_at?: string
          conv_rate?: number
          crm_discipline?: number
          followup_rate?: number
          id?: string
          sla_rate?: number
          tour_conv?: number
          user_id: string
          window_days: number
        }
        Update: {
          attendance?: number
          category?: Database["public"]["Enums"]["perf_category"]
          computed_at?: string
          conv_rate?: number
          crm_discipline?: number
          followup_rate?: number
          id?: string
          sla_rate?: number
          tour_conv?: number
          user_id?: string
          window_days?: number
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          full_name: string | null
          is_available: boolean
          is_clocked_in: boolean
          is_restricted: boolean
          performer_category: Database["public"]["Enums"]["perf_category"]
          phone: string | null
          primary_zone_id: string | null
          team: Database["public"]["Enums"]["review_team"] | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          full_name?: string | null
          is_available?: boolean
          is_clocked_in?: boolean
          is_restricted?: boolean
          performer_category?: Database["public"]["Enums"]["perf_category"]
          phone?: string | null
          primary_zone_id?: string | null
          team?: Database["public"]["Enums"]["review_team"] | null
          updated_at?: string
          user_id?: string
        }
        Update: {
          created_at?: string
          full_name?: string | null
          is_available?: boolean
          is_clocked_in?: boolean
          is_restricted?: boolean
          performer_category?: Database["public"]["Enums"]["perf_category"]
          phone?: string | null
          primary_zone_id?: string | null
          team?: Database["public"]["Enums"]["review_team"] | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_primary_zone_id_fkey"
            columns: ["primary_zone_id"]
            isOneToOne: false
            referencedRelation: "zones"
            referencedColumns: ["id"]
          },
        ]
      }
      reviews: {
        Row: {
          ack: Database["public"]["Enums"]["ack_choice"] | null
          ack_at: string | null
          assignment_id: string | null
          band: Database["public"]["Enums"]["review_band"]
          closed_at: string | null
          closed_by: string | null
          correct_approach: string | null
          correction_note: string | null
          corrective_action: string | null
          created_at: string
          critical_error: boolean
          critical_reasons: string[]
          customer_impact: string | null
          deadline: string | null
          employee_explanation: Json
          evidence: string[]
          id: string
          kind: Database["public"]["Enums"]["review_kind"]
          lead_id: string | null
          mandatory_reason: string | null
          occurred_at: string
          re_review_of: string | null
          review_day: string
          reviewee_id: string
          reviewer_comment: string | null
          reviewer_id: string | null
          scores: Json
          source_ref: string | null
          status: Database["public"]["Enums"]["feedback_status"]
          submitted_at: string | null
          tags: string[]
          team: Database["public"]["Enums"]["review_team"]
          total_score: number
          transcript: string | null
          updated_at: string
          verification:
            | Database["public"]["Enums"]["verification_result"]
            | null
          what_happened: string | null
          what_was_missed: string | null
        }
        Insert: {
          ack?: Database["public"]["Enums"]["ack_choice"] | null
          ack_at?: string | null
          assignment_id?: string | null
          band?: Database["public"]["Enums"]["review_band"]
          closed_at?: string | null
          closed_by?: string | null
          correct_approach?: string | null
          correction_note?: string | null
          corrective_action?: string | null
          created_at?: string
          critical_error?: boolean
          critical_reasons?: string[]
          customer_impact?: string | null
          deadline?: string | null
          employee_explanation?: Json
          evidence?: string[]
          id?: string
          kind?: Database["public"]["Enums"]["review_kind"]
          lead_id?: string | null
          mandatory_reason?: string | null
          occurred_at?: string
          re_review_of?: string | null
          review_day?: string
          reviewee_id: string
          reviewer_comment?: string | null
          reviewer_id?: string | null
          scores?: Json
          source_ref?: string | null
          status?: Database["public"]["Enums"]["feedback_status"]
          submitted_at?: string | null
          tags?: string[]
          team?: Database["public"]["Enums"]["review_team"]
          total_score?: number
          transcript?: string | null
          updated_at?: string
          verification?:
            | Database["public"]["Enums"]["verification_result"]
            | null
          what_happened?: string | null
          what_was_missed?: string | null
        }
        Update: {
          ack?: Database["public"]["Enums"]["ack_choice"] | null
          ack_at?: string | null
          assignment_id?: string | null
          band?: Database["public"]["Enums"]["review_band"]
          closed_at?: string | null
          closed_by?: string | null
          correct_approach?: string | null
          correction_note?: string | null
          corrective_action?: string | null
          created_at?: string
          critical_error?: boolean
          critical_reasons?: string[]
          customer_impact?: string | null
          deadline?: string | null
          employee_explanation?: Json
          evidence?: string[]
          id?: string
          kind?: Database["public"]["Enums"]["review_kind"]
          lead_id?: string | null
          mandatory_reason?: string | null
          occurred_at?: string
          re_review_of?: string | null
          review_day?: string
          reviewee_id?: string
          reviewer_comment?: string | null
          reviewer_id?: string | null
          scores?: Json
          source_ref?: string | null
          status?: Database["public"]["Enums"]["feedback_status"]
          submitted_at?: string | null
          tags?: string[]
          team?: Database["public"]["Enums"]["review_team"]
          total_score?: number
          transcript?: string | null
          updated_at?: string
          verification?:
            | Database["public"]["Enums"]["verification_result"]
            | null
          what_happened?: string | null
          what_was_missed?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reviews_assignment_id_fkey"
            columns: ["assignment_id"]
            isOneToOne: false
            referencedRelation: "assignments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "flow_checkin_status"
            referencedColumns: ["lead_id"]
          },
          {
            foreignKeyName: "reviews_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "flow_three_day_truth"
            referencedColumns: ["lead_id"]
          },
          {
            foreignKeyName: "reviews_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_re_review_of_fkey"
            columns: ["re_review_of"]
            isOneToOne: false
            referencedRelation: "reviews"
            referencedColumns: ["id"]
          },
        ]
      }
      screenshot_batches: {
        Row: {
          capture_window_end: string | null
          capture_window_start: string | null
          created_at: string
          detected_rows_total: number
          expected_override: number | null
          id: string
          metadata: Json
          rows_reconciled: number
          rows_segmented: number
          screenshot_count: number
          source_id: string | null
          status: string
          unresolved_count: number
          updated_at: string
          uploaded_at: string
          uploader_id: string | null
          visible_rows_expected: number
          whatsapp_account: string | null
        }
        Insert: {
          capture_window_end?: string | null
          capture_window_start?: string | null
          created_at?: string
          detected_rows_total?: number
          expected_override?: number | null
          id?: string
          metadata?: Json
          rows_reconciled?: number
          rows_segmented?: number
          screenshot_count?: number
          source_id?: string | null
          status?: string
          unresolved_count?: number
          updated_at?: string
          uploaded_at?: string
          uploader_id?: string | null
          visible_rows_expected?: number
          whatsapp_account?: string | null
        }
        Update: {
          capture_window_end?: string | null
          capture_window_start?: string | null
          created_at?: string
          detected_rows_total?: number
          expected_override?: number | null
          id?: string
          metadata?: Json
          rows_reconciled?: number
          rows_segmented?: number
          screenshot_count?: number
          source_id?: string | null
          status?: string
          unresolved_count?: number
          updated_at?: string
          uploaded_at?: string
          uploader_id?: string | null
          visible_rows_expected?: number
          whatsapp_account?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "screenshot_batches_source_id_fkey"
            columns: ["source_id"]
            isOneToOne: false
            referencedRelation: "whatsapp_sources"
            referencedColumns: ["id"]
          },
        ]
      }
      screenshot_observations: {
        Row: {
          batch_id: string
          blocker_hint: string | null
          captured_at: string
          color_hint: string | null
          contact_name: string | null
          created_at: string
          detected_label: string | null
          handler_hint: string | null
          id: string
          intelligence: Json
          last_message_preview: string | null
          lead_id: string | null
          movement_signal: string | null
          ocr_confidence: number | null
          operator_edited: boolean
          phone_normalized: string | null
          phone_raw: string | null
          preview_direction: string
          primary_mission: string | null
          raw_text: string
          reconciliation_reason: string | null
          reconciliation_state: string
          row_bottom_px: number | null
          row_index: number | null
          row_top_px: number | null
          screenshot_id: string
          seen_state: string
          source_id: string | null
          stage_confidence: number | null
          stage_inference: string | null
          unread_count: number | null
          unread_visible: boolean | null
          visible_timestamp_raw: string | null
          whatsapp_account: string | null
          whatsapp_row_color: string | null
          work_bucket: string | null
        }
        Insert: {
          batch_id: string
          blocker_hint?: string | null
          captured_at?: string
          color_hint?: string | null
          contact_name?: string | null
          created_at?: string
          detected_label?: string | null
          handler_hint?: string | null
          id?: string
          intelligence?: Json
          last_message_preview?: string | null
          lead_id?: string | null
          movement_signal?: string | null
          ocr_confidence?: number | null
          operator_edited?: boolean
          phone_normalized?: string | null
          phone_raw?: string | null
          preview_direction?: string
          primary_mission?: string | null
          raw_text?: string
          reconciliation_reason?: string | null
          reconciliation_state?: string
          row_bottom_px?: number | null
          row_index?: number | null
          row_top_px?: number | null
          screenshot_id: string
          seen_state?: string
          source_id?: string | null
          stage_confidence?: number | null
          stage_inference?: string | null
          unread_count?: number | null
          unread_visible?: boolean | null
          visible_timestamp_raw?: string | null
          whatsapp_account?: string | null
          whatsapp_row_color?: string | null
          work_bucket?: string | null
        }
        Update: {
          batch_id?: string
          blocker_hint?: string | null
          captured_at?: string
          color_hint?: string | null
          contact_name?: string | null
          created_at?: string
          detected_label?: string | null
          handler_hint?: string | null
          id?: string
          intelligence?: Json
          last_message_preview?: string | null
          lead_id?: string | null
          movement_signal?: string | null
          ocr_confidence?: number | null
          operator_edited?: boolean
          phone_normalized?: string | null
          phone_raw?: string | null
          preview_direction?: string
          primary_mission?: string | null
          raw_text?: string
          reconciliation_reason?: string | null
          reconciliation_state?: string
          row_bottom_px?: number | null
          row_index?: number | null
          row_top_px?: number | null
          screenshot_id?: string
          seen_state?: string
          source_id?: string | null
          stage_confidence?: number | null
          stage_inference?: string | null
          unread_count?: number | null
          unread_visible?: boolean | null
          visible_timestamp_raw?: string | null
          whatsapp_account?: string | null
          whatsapp_row_color?: string | null
          work_bucket?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "screenshot_observations_batch_id_fkey"
            columns: ["batch_id"]
            isOneToOne: false
            referencedRelation: "screenshot_batches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "screenshot_observations_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "flow_checkin_status"
            referencedColumns: ["lead_id"]
          },
          {
            foreignKeyName: "screenshot_observations_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "flow_three_day_truth"
            referencedColumns: ["lead_id"]
          },
          {
            foreignKeyName: "screenshot_observations_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "screenshot_observations_screenshot_id_fkey"
            columns: ["screenshot_id"]
            isOneToOne: false
            referencedRelation: "whatsapp_screenshots"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "screenshot_observations_source_id_fkey"
            columns: ["source_id"]
            isOneToOne: false
            referencedRelation: "whatsapp_sources"
            referencedColumns: ["id"]
          },
        ]
      }
      sla_breaches: {
        Row: {
          assignment_id: string
          breached_at: string
          id: string
          kind: Database["public"]["Enums"]["sla_kind"]
          resolved_at: string | null
        }
        Insert: {
          assignment_id: string
          breached_at?: string
          id?: string
          kind: Database["public"]["Enums"]["sla_kind"]
          resolved_at?: string | null
        }
        Update: {
          assignment_id?: string
          breached_at?: string
          id?: string
          kind?: Database["public"]["Enums"]["sla_kind"]
          resolved_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sla_breaches_assignment_id_fkey"
            columns: ["assignment_id"]
            isOneToOne: false
            referencedRelation: "assignments"
            referencedColumns: ["id"]
          },
        ]
      }
      supply_properties: {
        Row: {
          created_at: string
          doc: Json
          enabled: boolean
          id: string
          key: string
          notes: string | null
          source: string
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          created_at?: string
          doc?: Json
          enabled?: boolean
          id?: string
          key: string
          notes?: string | null
          source?: string
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          created_at?: string
          doc?: Json
          enabled?: boolean
          id?: string
          key?: string
          notes?: string | null
          source?: string
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      system_settings: {
        Row: {
          key: string
          updated_at: string
          updated_by: string | null
          value: Json
        }
        Insert: {
          key: string
          updated_at?: string
          updated_by?: string | null
          value: Json
        }
        Update: {
          key?: string
          updated_at?: string
          updated_by?: string | null
          value?: Json
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      whatsapp_screenshots: {
        Row: {
          ai_visible_row_count: number | null
          batch_id: string
          captured_at: string | null
          created_at: string
          error_message: string | null
          extraction_confidence: number | null
          extraction_model: string | null
          extraction_version: string | null
          file_name: string | null
          id: string
          image_hash: string | null
          processing_status: string
          raw_ocr_summary: Json
          reused_from_screenshot_id: string | null
          source_id: string | null
          temporary_storage_path: string | null
          updated_at: string
          uploaded_at: string
          visible_row_count: number
          warnings: Json
          whatsapp_account: string | null
        }
        Insert: {
          ai_visible_row_count?: number | null
          batch_id: string
          captured_at?: string | null
          created_at?: string
          error_message?: string | null
          extraction_confidence?: number | null
          extraction_model?: string | null
          extraction_version?: string | null
          file_name?: string | null
          id?: string
          image_hash?: string | null
          processing_status?: string
          raw_ocr_summary?: Json
          reused_from_screenshot_id?: string | null
          source_id?: string | null
          temporary_storage_path?: string | null
          updated_at?: string
          uploaded_at?: string
          visible_row_count?: number
          warnings?: Json
          whatsapp_account?: string | null
        }
        Update: {
          ai_visible_row_count?: number | null
          batch_id?: string
          captured_at?: string | null
          created_at?: string
          error_message?: string | null
          extraction_confidence?: number | null
          extraction_model?: string | null
          extraction_version?: string | null
          file_name?: string | null
          id?: string
          image_hash?: string | null
          processing_status?: string
          raw_ocr_summary?: Json
          reused_from_screenshot_id?: string | null
          source_id?: string | null
          temporary_storage_path?: string | null
          updated_at?: string
          uploaded_at?: string
          visible_row_count?: number
          warnings?: Json
          whatsapp_account?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "whatsapp_screenshots_batch_id_fkey"
            columns: ["batch_id"]
            isOneToOne: false
            referencedRelation: "screenshot_batches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "whatsapp_screenshots_reused_from_screenshot_id_fkey"
            columns: ["reused_from_screenshot_id"]
            isOneToOne: false
            referencedRelation: "whatsapp_screenshots"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "whatsapp_screenshots_source_id_fkey"
            columns: ["source_id"]
            isOneToOne: false
            referencedRelation: "whatsapp_sources"
            referencedColumns: ["id"]
          },
        ]
      }
      whatsapp_sources: {
        Row: {
          campaign: string | null
          created_at: string
          id: string
          is_active: boolean
          label: string
          updated_at: string
          wa_number: string
        }
        Insert: {
          campaign?: string | null
          created_at?: string
          id?: string
          is_active?: boolean
          label: string
          updated_at?: string
          wa_number: string
        }
        Update: {
          campaign?: string | null
          created_at?: string
          id?: string
          is_active?: boolean
          label?: string
          updated_at?: string
          wa_number?: string
        }
        Relationships: []
      }
      work_claims: {
        Row: {
          batch_id: string | null
          bucket: string
          claimed_at: string
          created_at: string
          expires_at: string | null
          id: string
          is_current: boolean
          last_meaningful_action_at: string
          lead_id: string
          next_action: string | null
          next_action_at: string | null
          operator_id: string
          release_reason: string | null
          released_at: string | null
          state: string
          updated_at: string
        }
        Insert: {
          batch_id?: string | null
          bucket?: string
          claimed_at?: string
          created_at?: string
          expires_at?: string | null
          id?: string
          is_current?: boolean
          last_meaningful_action_at?: string
          lead_id: string
          next_action?: string | null
          next_action_at?: string | null
          operator_id: string
          release_reason?: string | null
          released_at?: string | null
          state?: string
          updated_at?: string
        }
        Update: {
          batch_id?: string | null
          bucket?: string
          claimed_at?: string
          created_at?: string
          expires_at?: string | null
          id?: string
          is_current?: boolean
          last_meaningful_action_at?: string
          lead_id?: string
          next_action?: string | null
          next_action_at?: string | null
          operator_id?: string
          release_reason?: string | null
          released_at?: string | null
          state?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "work_claims_batch_id_fkey"
            columns: ["batch_id"]
            isOneToOne: false
            referencedRelation: "draft_batches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "work_claims_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "flow_checkin_status"
            referencedColumns: ["lead_id"]
          },
          {
            foreignKeyName: "work_claims_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "flow_three_day_truth"
            referencedColumns: ["lead_id"]
          },
          {
            foreignKeyName: "work_claims_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
        ]
      }
      workload_points: {
        Row: {
          active_no_next_action: number
          max_points: number
          overdue_followups: number
          points: number
          positive_no_quote: number
          sla_breaches_open: number
          state: Database["public"]["Enums"]["availability_state"]
          tours_no_outcome: number
          uncontacted: number
          updated_at: string
          user_id: string
        }
        Insert: {
          active_no_next_action?: number
          max_points?: number
          overdue_followups?: number
          points?: number
          positive_no_quote?: number
          sla_breaches_open?: number
          state?: Database["public"]["Enums"]["availability_state"]
          tours_no_outcome?: number
          uncontacted?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          active_no_next_action?: number
          max_points?: number
          overdue_followups?: number
          points?: number
          positive_no_quote?: number
          sla_breaches_open?: number
          state?: Database["public"]["Enums"]["availability_state"]
          tours_no_outcome?: number
          uncontacted?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      zone_membership: {
        Row: {
          created_at: string
          id: string
          is_primary: boolean
          user_id: string
          zone_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_primary?: boolean
          user_id: string
          zone_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_primary?: boolean
          user_id?: string
          zone_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "zone_membership_zone_id_fkey"
            columns: ["zone_id"]
            isOneToOne: false
            referencedRelation: "zones"
            referencedColumns: ["id"]
          },
        ]
      }
      zones: {
        Row: {
          code: string
          created_at: string
          id: string
          inventory_strength: number
          is_serviceable: boolean
          name: string
          updated_at: string
        }
        Insert: {
          code: string
          created_at?: string
          id?: string
          inventory_strength?: number
          is_serviceable?: boolean
          name: string
          updated_at?: string
        }
        Update: {
          code?: string
          created_at?: string
          id?: string
          inventory_strength?: number
          is_serviceable?: boolean
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      flow_checkin_status: {
        Row: {
          agreement_done: boolean | null
          arrived_at: string | null
          bed_reference: string | null
          confirmed_at: string | null
          current_pipeline_stage: string | null
          keys_handed_over_at: string | null
          kyc_done: boolean | null
          lead_id: string | null
          next_checkin_gate: string | null
          owner_approval_status: string | null
          payment_ref: string | null
          payment_verified: boolean | null
          phone: string | null
          ready_to_confirm: boolean | null
          room_number: string | null
          wa_name: string | null
        }
        Relationships: []
      }
      flow_revenue_leakage: {
        Row: {
          current_handler: string | null
          current_handler_name: string | null
          current_owner: string | null
          current_owner_name: string | null
          current_pipeline_stage: string | null
          last_message_preview: string | null
          latest_observation_at: string | null
          lead_id: string | null
          leak_type: string | null
          observation_id: string | null
          phone: string | null
          severity: number | null
          wa_name: string | null
          why_red: string | null
        }
        Relationships: []
      }
      flow_three_day_truth: {
        Row: {
          canonical_event: string | null
          claim_expires_at: string | null
          claim_id: string | null
          claim_state: string | null
          color_hint: string | null
          compiled_action_due_at: string | null
          compiled_next_action: string | null
          compiled_priority: string | null
          compiler_confidence: number | null
          compiler_needs_review: boolean | null
          conversation_health: string | null
          conversation_momentum: number | null
          conversation_movement: string | null
          conversation_stage: string | null
          current_batch_id: string | null
          current_handler: string | null
          current_handler_name: string | null
          current_owner: string | null
          current_owner_name: string | null
          current_pipeline_stage: string | null
          detected_label: string | null
          evidence_quality: number | null
          handler_hint: string | null
          last_message_preview: string | null
          latest_observation_at: string | null
          lead_id: string | null
          lead_status: string | null
          next_action_at: string | null
          next_action_id: string | null
          next_action_kind: string | null
          observation_id: string | null
          phone: string | null
          preview_direction: string | null
          priority: Database["public"]["Enums"]["lead_priority"] | null
          screenshot_status: string | null
          seen_state: string | null
          stage_confidence: number | null
          stage_inference: string | null
          sync_state: string | null
          unread_count: number | null
          unread_visible: boolean | null
          wa_name: string | null
          waiting_on: string | null
        }
        Relationships: [
          {
            foreignKeyName: "work_claims_batch_id_fkey"
            columns: ["current_batch_id"]
            isOneToOne: false
            referencedRelation: "draft_batches"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      any_role: { Args: { _user_id: string }; Returns: boolean }
      assign_conversation_pattern_family: {
        Args: {
          _family: string
          _notes?: string
          _pattern_id: string
          _rule_id?: string
        }
        Returns: {
          assigned_family: string | null
          avg_ocr_confidence: number | null
          confidence_band: string | null
          corpus_row_count: number
          first_seen_at: string
          id: string
          last_seen_at: string
          mapped_rule_id: string | null
          normalized_pattern: string
          notes: string | null
          occurrence_count: number
          representative_text: string
          reviewed_at: string | null
          reviewed_by: string | null
          sample_labels: string[]
          source_corpus: string
          source_screenshots: string[]
          source_zones: string[]
          status: string
          suggested_family: string | null
        }
        SetofOptions: {
          from: "*"
          to: "conversation_pattern_clusters"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      claim_flow_lead: {
        Args: {
          _batch_id?: string
          _bucket?: string
          _lead_id: string
          _next_action?: string
          _next_action_at?: string
          _operator_id: string
          _ttl_minutes?: number
        }
        Returns: {
          batch_id: string | null
          bucket: string
          claimed_at: string
          created_at: string
          expires_at: string | null
          id: string
          is_current: boolean
          last_meaningful_action_at: string
          lead_id: string
          next_action: string | null
          next_action_at: string | null
          operator_id: string
          release_reason: string | null
          released_at: string | null
          state: string
          updated_at: string
        }
        SetofOptions: {
          from: "*"
          to: "work_claims"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      complete_flow_item: {
        Args: {
          _batch_item_id: string
          _claim_id: string
          _next_action_at?: string
          _next_action_kind?: string
          _notes?: string
          _outcome: string
        }
        Returns: Json
      }
      confirm_flow_checkin: { Args: { _lead_id: string }; Returns: Json }
      flow_claim_lead: {
        Args: {
          p_batch_id?: string
          p_lead_id: string
          p_operator_id: string
          p_operator_name: string
        }
        Returns: {
          claim_id: string
          current_operator: string
          ok: boolean
          reason: string
        }[]
      }
      flow_close_batch: {
        Args: { p_batch_id: string; p_operator_id: string; p_reason?: string }
        Returns: boolean
      }
      flow_heartbeat_claim: {
        Args: { p_claim_id: string; p_operator_id: string }
        Returns: boolean
      }
      flow_refresh_batch: { Args: { p_batch_id: string }; Returns: undefined }
      flow_release_claim: {
        Args: { p_claim_id: string; p_operator_id: string; p_reason?: string }
        Returns: boolean
      }
      flow_reserve_lead: {
        Args: {
          p_batch_id: string
          p_lead_id: string
          p_operator_id: string
          p_operator_name: string
        }
        Returns: {
          claim_id: string
          current_operator: string
          ok: boolean
          reason: string
        }[]
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_tower_ops: { Args: { _user_id: string }; Returns: boolean }
      reconcile_conversation_pattern_mapping: {
        Args: { _pattern_id: string }
        Returns: Json
      }
      release_flow_claim: {
        Args: { _claim_id: string; _reason?: string }
        Returns: undefined
      }
      start_compiled_lead_action: {
        Args: { _lead_id: string; _ttl_minutes?: number }
        Returns: Json
      }
      touch_flow_claim: {
        Args: { _claim_id: string; _ttl_minutes?: number }
        Returns: {
          batch_id: string | null
          bucket: string
          claimed_at: string
          created_at: string
          expires_at: string | null
          id: string
          is_current: boolean
          last_meaningful_action_at: string
          lead_id: string
          next_action: string | null
          next_action_at: string | null
          operator_id: string
          release_reason: string | null
          released_at: string | null
          state: string
          updated_at: string
        }
        SetofOptions: {
          from: "*"
          to: "work_claims"
          isOneToOne: true
          isSetofReturn: false
        }
      }
    }
    Enums: {
      ack_choice: "understood" | "need_clarification" | "disagree"
      app_role:
        | "admin"
        | "manager"
        | "operator"
        | "sales"
        | "control_tower"
        | "founder_admin"
        | "zone_manager"
      assignment_state:
        | "pending_accept"
        | "accepted"
        | "declined"
        | "reassigned"
        | "completed"
        | "expired"
      availability_state:
        | "available"
        | "near_capacity"
        | "blocked"
        | "unavailable"
        | "restricted"
      feedback_status:
        | "new"
        | "viewed"
        | "acknowledged"
        | "correction_pending"
        | "submitted"
        | "re_review_pending"
        | "closed"
        | "escalated"
      lead_priority: "super_hot" | "hot" | "active" | "future" | "nurture"
      move_in_bucket:
        | "today"
        | "within_3d"
        | "within_7d"
        | "within_15d"
        | "within_30d"
        | "more_30d"
        | "not_confirmed"
      perf_category: "A" | "B" | "C" | "D"
      review_band: "gold" | "strong" | "coaching" | "risk" | "critical"
      review_kind: "chat" | "call" | "lead_journey"
      review_team:
        | "control_tower"
        | "flow_ops"
        | "pcm"
        | "closing"
        | "cross_functional"
      scenario_code:
        | "connected_qualified"
        | "connected_incomplete"
        | "callback_requested"
        | "no_answer"
        | "whatsapp_sent"
        | "wrong_number"
        | "duplicate"
        | "location_changed"
        | "date_changed"
        | "future_movein"
        | "tour_ready"
        | "virtual_tour"
        | "pre_booking"
        | "not_serviceable"
        | "not_interested"
        | "invalid_spam"
      sla_kind: "accept" | "first_action"
      verification_result:
        | "closed_correctly"
        | "partially_corrected"
        | "correction_rejected"
        | "customer_unreachable"
        | "manager_intervention"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      ack_choice: ["understood", "need_clarification", "disagree"],
      app_role: [
        "admin",
        "manager",
        "operator",
        "sales",
        "control_tower",
        "founder_admin",
        "zone_manager",
      ],
      assignment_state: [
        "pending_accept",
        "accepted",
        "declined",
        "reassigned",
        "completed",
        "expired",
      ],
      availability_state: [
        "available",
        "near_capacity",
        "blocked",
        "unavailable",
        "restricted",
      ],
      feedback_status: [
        "new",
        "viewed",
        "acknowledged",
        "correction_pending",
        "submitted",
        "re_review_pending",
        "closed",
        "escalated",
      ],
      lead_priority: ["super_hot", "hot", "active", "future", "nurture"],
      move_in_bucket: [
        "today",
        "within_3d",
        "within_7d",
        "within_15d",
        "within_30d",
        "more_30d",
        "not_confirmed",
      ],
      perf_category: ["A", "B", "C", "D"],
      review_band: ["gold", "strong", "coaching", "risk", "critical"],
      review_kind: ["chat", "call", "lead_journey"],
      review_team: [
        "control_tower",
        "flow_ops",
        "pcm",
        "closing",
        "cross_functional",
      ],
      scenario_code: [
        "connected_qualified",
        "connected_incomplete",
        "callback_requested",
        "no_answer",
        "whatsapp_sent",
        "wrong_number",
        "duplicate",
        "location_changed",
        "date_changed",
        "future_movein",
        "tour_ready",
        "virtual_tour",
        "pre_booking",
        "not_serviceable",
        "not_interested",
        "invalid_spam",
      ],
      sla_kind: ["accept", "first_action"],
      verification_result: [
        "closed_correctly",
        "partially_corrected",
        "correction_rejected",
        "customer_unreachable",
        "manager_intervention",
      ],
    },
  },
} as const
