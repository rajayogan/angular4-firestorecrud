import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  prodname: string;
  proddesc: string;
  prodcollection: AngularFirestoreCollection<any> = this.afs.collection('products');
  prodobs = this.prodcollection.valueChanges();

  constructor(private afs: AngularFirestore) {

  }

  add(){
    this.prodcollection.add({
      productname: this.prodname,
      productdesc: this.proddesc
    }).then((docRef) => {
      this.prodcollection.doc(docRef.id).update({
        prodid: docRef.id
      })
    })

      .catch((err) => {
      console.log(err);
    })
  }

  update(prod) {
    this.prodcollection.doc(prod.prodid).update({
      productname: 'newprodname'
    }).then(() => {
      console.log('updated');
    })
  }

  delete(prod) {
    this.prodcollection.doc(prod.prodid).delete().then(() => {
      console.log('deleted');
    })
  }
}
