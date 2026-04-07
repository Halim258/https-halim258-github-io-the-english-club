import { useState } from "react";
import { Package, Plus, Pencil, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Product {
  id: string;
  product: string;
  price: number | null;
  price_for_members: number | null;
  per: string | null;
}

interface Props {
  products: Product[];
  onRefresh: () => void;
}

const emptyForm = { product: "", price: "", price_for_members: "", per: "" };

export default function AdminProducts({ products, onRefresh }: Props) {
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const { toast } = useToast();

  const handleAdd = async () => {
    if (!form.product) return;
    const { error } = await supabase.from("school_products").insert({
      product: form.product, price: parseFloat(form.price) || 0,
      price_for_members: form.price_for_members ? parseFloat(form.price_for_members) : null, per: form.per || null,
    });
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else { toast({ title: "Product added" }); setForm(emptyForm); setAddOpen(false); onRefresh(); }
  };

  const openEdit = (p: Product) => {
    setEditId(p.id);
    setForm({ product: p.product, price: String(p.price || 0), price_for_members: String(p.price_for_members || ""), per: p.per || "" });
    setEditOpen(true);
  };

  const handleEdit = async () => {
    if (!editId) return;
    const { error } = await supabase.from("school_products").update({
      product: form.product, price: parseFloat(form.price) || 0,
      price_for_members: form.price_for_members ? parseFloat(form.price_for_members) : null, per: form.per || null,
    }).eq("id", editId);
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else { toast({ title: "Product updated" }); setEditOpen(false); setEditId(null); setForm(emptyForm); onRefresh(); }
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("school_products").delete().eq("id", id);
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else { toast({ title: "Product deleted" }); onRefresh(); }
  };

  const formFields = (
    <div className="space-y-3">
      <div><Label>Product Name *</Label><Input value={form.product} onChange={e => setForm({...form, product: e.target.value})} /></div>
      <div className="grid grid-cols-2 gap-3">
        <div><Label>Price (ج.م)</Label><Input type="number" value={form.price} onChange={e => setForm({...form, price: e.target.value})} /></div>
        <div><Label>Member Price</Label><Input type="number" value={form.price_for_members} onChange={e => setForm({...form, price_for_members: e.target.value})} /></div>
      </div>
      <div><Label>Per (unit)</Label><Input value={form.per} onChange={e => setForm({...form, per: e.target.value})} placeholder="month, session, etc." /></div>
    </div>
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <Package className="h-5 w-5 text-primary" />
          <span className="font-semibold">{products.length} Products & Services</span>
        </div>
        <Dialog open={addOpen} onOpenChange={setAddOpen}>
          <DialogTrigger asChild><Button size="sm" onClick={() => setForm(emptyForm)}><Plus className="h-4 w-4 mr-1" /> Add Product</Button></DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Add Product</DialogTitle></DialogHeader>
            {formFields}
            <Button onClick={handleAdd} className="w-full mt-2">Add</Button>
          </DialogContent>
        </Dialog>
      </div>

      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Edit Product</DialogTitle></DialogHeader>
          {formFields}
          <Button onClick={handleEdit} className="w-full mt-2">Save</Button>
        </DialogContent>
      </Dialog>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {products.map(p => (
          <div key={p.id} className="rounded-xl border bg-card p-4 shadow-soft hover:shadow-md transition-shadow">
            <h4 className="font-semibold text-sm mb-2">{p.product}</h4>
            <div className="flex items-center gap-3 text-xs">
              <span className="font-mono font-bold text-primary">{p.price?.toLocaleString() || 0} ج.م</span>
              {p.price_for_members != null && (
                <span className="font-mono text-emerald-600">Members: {p.price_for_members.toLocaleString()} ج.م</span>
              )}
            </div>
            {p.per && <p className="text-[10px] text-muted-foreground mt-1">Per: {p.per}</p>}
            <div className="flex gap-1 mt-3 border-t pt-2">
              <Button variant="ghost" size="sm" className="h-7 text-xs" onClick={() => openEdit(p)}>
                <Pencil className="h-3 w-3 mr-1" /> Edit
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-7 text-xs text-destructive hover:text-destructive"><Trash2 className="h-3 w-3 mr-1" /> Delete</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader><AlertDialogTitle>Delete Product</AlertDialogTitle><AlertDialogDescription>Delete "{p.product}"?</AlertDialogDescription></AlertDialogHeader>
                  <AlertDialogFooter><AlertDialogCancel>Cancel</AlertDialogCancel><AlertDialogAction onClick={() => handleDelete(p.id)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Delete</AlertDialogAction></AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
