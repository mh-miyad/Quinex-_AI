'use client';

import { useState } from 'react';
import { useEstateStore } from '@/lib/store';
import { LeadsTable } from './leads-table';
import { AddLeadForm } from './add-lead-form';

export function LeadsDashboard() {
  const { leads, addLead, updateLead, deleteLead } = useEstateStore();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingLead, setEditingLead] = useState<any>(null);

  const handleAddLead = (leadData: any) => {
    addLead(leadData);
  };

  const handleEditLead = (lead: any) => {
    setEditingLead(lead);
    setShowAddForm(true);
  };

  const handleDeleteLead = (leadId: string) => {
    if (confirm('Are you sure you want to delete this lead?')) {
      deleteLead(leadId);
    }
  };

  const closeForm = () => {
    setShowAddForm(false);
    setEditingLead(null);
  };

  return (
    <>
      <LeadsTable
        leads={leads}
        onAddLead={handleAddLead}
        onEditLead={handleEditLead}
        onDeleteLead={handleDeleteLead}
      />

      {/* Add/Edit Lead Form */}
      {showAddForm && (
        <AddLeadForm 
          onClose={closeForm}
          editLead={editingLead}
        />
      )}
    </>
  );
}